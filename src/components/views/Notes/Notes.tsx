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
import { AddTask } from 'src/components/Form/Form';

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
    // createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    // editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    // enableEditing: true,
    // renderEditRowModalContent: (row, close) => (  <Stack>
    //     <Title order={3}>Edit User</Title>
    //    <Modal onAdd={()=> {}} isVisible></Modal>
    //     <Flex justify="flex-end" mt="xl">
    //       <MRT_EditActionButtons variant="text" table={table} row={row} />
    //     </Flex>
    //   </Stack>
    //    ),
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
    getRowId: row => row.id,
  });
  const [opened, { open, close }] = useDisclosure();

  return (
    <MainLayout>
      <StyledNotesList>
        <StyledH1>My Private Notes</StyledH1>;
        <AddNewButton onClick={open} />
        <MantineReactTable table={table}></MantineReactTable>
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
