import React, { useCallback, useState } from 'react';
import { openDeleteModal, openDetailsModal, openModal, StyledH1, StyledH2, Table } from '@notes/components';
import { StyledNotesList } from './styled';
import { MainLayout } from '@notes/layout';
import { ActionIcon, Button, Checkbox, Flex, LoadingOverlay, Text, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash, IconBubbleText } from '@tabler/icons-react';
import { useNotes } from '@notes/hooks';
import { AddNewButton } from 'src/components/button-link/add-new-button';
import classes from './notes-table.module.css';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable
} from '@tanstack/react-table';
import { Note } from '@notes/types';

const TableIcons = ({ openDetailsModal, openDeleteModal, openEditModal }) => {
  return (
    <Flex gap="md" justify="center">
      <Tooltip label="Edit">
        <ActionIcon onClick={openEditModal}>
          <IconEdit />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Delete">
        <ActionIcon color="red" onClick={openDeleteModal}>
          <IconTrash />
        </ActionIcon>
      </Tooltip>
      {/* <Tooltip label="Select as done">
        <Checkbox />
      </Tooltip> */}
      <Tooltip label="Show more">
        <ActionIcon color={'var(--primary)'} onClick={openDetailsModal}>
          <IconBubbleText />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};

export const Notes = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5
  });
  const {
    notes: { isPending, isFetching, isLoading, data: notes },
    addNewNote,
    editNote,
    deleteNote
  } = useNotes();

  const columnHelper = createColumnHelper<Note>();

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
            openDeleteModal={() => openDeleteModal(props.row.original.id, deleteNote.mutate)}
            openEditModal={() => openModal(props.row.original, editNote.mutate)}
          />
        );
      }
    })
  ];

  const table = useReactTable({
    columns,
    data: notes || [],
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <MainLayout>
      <StyledNotesList>
        <StyledH1>My Private Notes</StyledH1>
        <AddNewButton openModal={openModal} />
        <br />
        <Table table={table} isLoading={isLoading} />

        {!notes?.length && <StyledH2>Your note list is empty! Enter a new note! </StyledH2>}
      </StyledNotesList>
    </MainLayout>
  );
};
