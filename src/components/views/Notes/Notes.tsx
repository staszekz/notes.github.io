import React, { useEffect, useState } from 'react';
import { StyledH1, StyledH2, Modal } from '@notes/components';
import { useDispatch, useSelector } from 'react-redux';
import { StyledNotesList } from './styled';
import { MainLayout } from '@notes/layout';
import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { ActionIcon, Flex, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useNotes } from '@notes/hooks';
import { useDisclosure } from '@mantine/hooks';
import { AddNewButton } from 'src/components/button-link/add-new-button';
import classes from './notes-table.module.css';

export const Notes = () => {
  const dispatch = useDispatch();

  const {
    notes: { isPending, isFetching, isLoading, data: notes },
    addNewNote,
    editNote,
    deleteNote,
  } = useNotes();

  const [detailsVisible, setDetailsVisible] = useState(false);

  const handleDeleteNote = (id: string) => {
    deleteNote.mutate(id);
  };

  const columns = useMemo<MRT_ColumnDef<Note, unknown>[]>(
    () => [
      { accessorKey: 'title', header: 'Title' },
      { accessorKey: 'created', header: 'Created' },
      { accessorKey: 'content', header: 'Content' },
    ],
    [],
  );

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
    getRowId: row => row.id,
    renderTopToolbarCustomActions: () => <AddNewButton onClick={open} />,
    paginationDisplayMode: 'pages',
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Edit">
          <ActionIcon onClick={open}>
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete">
          <ActionIcon color="red" onClick={() => handleDeleteNote(row.id)}>
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
  });
  const [opened, { open, close }] = useDisclosure();

  return (
    <MainLayout>
      <StyledNotesList>
        <StyledH1>My Private Notes</StyledH1>;{/* <AddNewButton onClick={open} /> */}
        <MantineReactTable table={table} />
        {!notes?.length && <StyledH2>Your note list is empty! Enter a new note! </StyledH2>}
      </StyledNotesList>
      <Modal opened={opened} close={close} title="Modal title" />
    </MainLayout>
  );
};

type Note = {
  id: string;
  title: string;
  created: string;
  content: string;
};
