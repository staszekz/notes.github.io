import React, { useState, useEffect, useMemo } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MainLayout } from '@notes/layout';
import { openDeleteModal, openDetailsModal, openModal, StyledH1, StyledH2, Table, TableIcons } from '@notes/components';

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
    columnHelper.accessor('title', {
      header: 'Title'
    }),
    columnHelper.accessor('created', {
      header: 'Created'
    }),
    columnHelper.accessor('content', {
      header: 'Content'
    }),
    columnHelper.display({
      header: 'Actions',
      cell: props => {
        return (
          <TableIcons
            openDetailsModal={() => openDetailsModal(props.row.original.content)}
            openDeleteModal={() => openDeleteModal(props.row.original.id as string, deleteElement.mutate)}
            openEditModal={() => openModal(props.row.original, editElement.mutate)}
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
          <Table table={table} isLoading={isLoading} />
          {!todos?.length && <StyledH2>Your todo list is empty! Enter a new task! </StyledH2>}
        </StyledNotesList>
      </MainLayout>
    </>
  );
};
