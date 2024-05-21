import React, {  useState } from 'react';
import { StyledH1, StyledH2, Table } from '@notes/components';
import { StyledNotesList } from './styled';
import { MainLayout } from '@notes/layout';
import { useMemo } from 'react';
import {  useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { ActionIcon, Flex, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useNotes } from '@notes/hooks';
import { AddNewButton } from 'src/components/button-link/add-new-button';
import classes from './notes-table.module.css';
import { modals } from '@mantine/modals';
import { AddTask } from 'src/components/Form/Form';


const Title = () => <h2>Add new note</h2>

export const Notes = () => {
  const {
    notes: { isPending, isFetching, isLoading, data: notes },
    addNewNote,
    editNote,
    deleteNote,
  } = useNotes();

  // dodać tez last modified on
  const columns = useMemo<MRT_ColumnDef<Note, unknown>[]>(
    () => [
      { accessorKey: 'title', header: 'Title' },
      { accessorKey: 'created', header: 'Created' },
      { accessorKey: 'content', header: 'Content' },
    ],
    [],
  );

  const openModal = () => modals.open({
  title: <Title/>,
  centered: true,
  children: <AddTask/>,
})

const openDeleteModal = (id: number) => modals.openConfirmModal({
title: 'Delete note',
centered: true,
children: 'Are you sure you want to delete this note?',
labels: {
  confirm: 'Delete',
  cancel: 'Cancel',
},
 confirmProps: { color: 'red' },
onConfirm:()=>  deleteNote.mutate(id),
})

  const [row, setRow] = useState<Note | null>(null);

  const table = useMantineReactTable({
    columns,
    data: notes || [],
    state: {
      showLoadingOverlay: isFetching,
      showSkeletons: isLoading,
    },
    enableRowSelection: true,
    mantineTableProps: {
      className: classes.table,
      highlightOnHover: false,
      striped: 'odd',
      withColumnBorders: true,
      withRowBorders: true,
      withTableBorder: true,
    },
    mantinePaperProps: {
      className: classes.table,
    },
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    renderTopToolbarCustomActions: () => <AddNewButton onClick={openModal} />,
    paginationDisplayMode: 'pages',
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Edit">
          <ActionIcon
            onClick={() => {
              console.log(row)
              openModal();
            }}
          >
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete">
          <ActionIcon onClick={()=> openDeleteModal(row.original.id)} color="red">
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
  });

  return (
    <MainLayout>
      <StyledNotesList>
        <StyledH1>My Private Notes</StyledH1>
        <Table table={table} />
        {!notes?.length && <StyledH2>Your note list is empty! Enter a new note! </StyledH2>}
      </StyledNotesList>
    </MainLayout>
  );
};

type Note = {
  id: string;
  title: string;
  created: string;
  content: string;
};

