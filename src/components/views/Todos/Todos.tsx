import React, { useState, useEffect, useMemo } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MainLayout } from '@notes/layout';
import {
  openDeleteModal,
  openDetailsModal,
  openModal,
  openTodoModal,
  StyledH1,
  StyledH2,
  Table,
  TableIcons
} from '@notes/components';

import { useRemoteData } from '@notes/hooks';
import { StyledNotesList } from 'src/components/views/Notes/styled';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable
} from '@tanstack/react-table';
import { Todo } from '@notes/types';
import { AddNewButton } from 'src/components/button-link/add-new-button';
import { Checkbox, Flex } from '@mantine/core';
import dayjs from 'dayjs';

export const Todos = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const {
    collection: { isPending, isFetching, isLoading, data: todos },
    addElement,
    editElement,
    deleteElement
  } = useRemoteData({ key: 'todos' });

  const columnHelper = createColumnHelper<Todo>();

  // dodać tez last modified on
  const columns = [
    columnHelper.display({
      header: '#',
      cell: props => {
        return <span>{props.row.index + 1}</span>;
      }
    }),
    columnHelper.accessor('title', {
      header: 'Title'
    }),
    columnHelper.accessor('created', {
      header: 'Created'
    }),
    columnHelper.accessor('extraContent', {
      header: 'Extra Content'
    }),
    columnHelper.accessor('deadline', {
      header: 'Deadline',
      cell: props => {
        return <span>{dayjs(props.cell.getValue()).format('YYYY/MM/DD')}</span>;
      }
    }),
    columnHelper.accessor('completed', {
      header: 'Completed',
      cell: props => {
        return (
          <Flex gap="md" justify="center">
            <Checkbox color="lime" variant="outline" checked={props.cell.getValue()} />
          </Flex>
        );
      }
    }),
    columnHelper.display({
      header: 'Actions',
      cell: props => {
        return (
          <TableIcons
            openDetailsModal={() => openDetailsModal(props.row.original.extraContent)}
            openDeleteModal={() => openDeleteModal(props.row.original.id as string, deleteElement.mutate)}
            openEditModal={() => openTodoModal(props.row.original, editElement.mutate)}
          />
        );
      }
    })
  ];

  const table = useReactTable({
    columns,
    data: todos || [],
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <>
      <MainLayout>
        <StyledNotesList>
          <StyledH1>My Private Todo tasks</StyledH1>
          <AddNewButton openModal={openTodoModal} />
          <br />
          <Table table={table} isLoading={isLoading} />
          {!todos?.length && <StyledH2>Your todo list is empty! Enter a new task! </StyledH2>}
        </StyledNotesList>
      </MainLayout>
    </>
  );
};
