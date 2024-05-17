import React, { useEffect, useState } from 'react';
import { StyledH1, StyledH2, Filters, NoteDetails, NoteItem, Modal } from '@notes/components';
import { useDispatch, useSelector } from 'react-redux';
import { StyledNotesList } from './styled';
import { MainLayout } from '@notes/layout';
import { useMemo } from 'react';
import {
  MantineReactTable,
  MRT_EditActionButtons,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { ActionIcon, Flex, Stack, Title, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useNotes } from '@notes/hooks';
import { useDisclosure } from '@mantine/hooks';
import {  Button } from '@mantine/core';
import { AddNewButton, StyledAddItemButton } from 'src/components/button-link/add-new-button';
import { AddTask } from 'src/components/Form/Form';

export const Notes = () => {
const dispatch = useDispatch();

const {notes: {isPending,isLoading, data: notes}, addNewNote,editNote,deleteNote} = useNotes()


  const [showID, setShowID] = useState('');
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterContent, setFilterContent] = useState('');

  const handleShowDetails = id => {
    setDetailsVisible(!detailsVisible);
    setShowID(id);
  };

  const handleCloseDetails = () => {
    setDetailsVisible(!detailsVisible);
    setShowID('');
  };

  const handleFilterTitleChange = e => {
    setFilterTitle(e.target.value);
  };
  const handleFilterContentChange = e => {
    setFilterContent(e.target.value);
  };

  const clearFilter = () => {
    setFilterTitle('');
    setFilterContent('');
  };

  const handleDeleteNote = (id: string) => {
    deleteNote.mutate(id)
  };

const columns = useMemo<MRT_ColumnDef<Note, unknown>[]>(() => [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'created', header: 'Created' },
  { accessorKey: 'content', header: 'Content' },
], []);

  // const { isModalOpen } = useSelector((state: RootState) => state.modalReducer);
  console.log('🚀 ~ data:', notes)

  
  const table = useMantineReactTable({
    columns,
    data: notes || [],
  
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
    getRowId: (row) => row.id,
  });
const [opened, { open, close }] = useDisclosure();
  console.log('🚀 ~ opened:', opened)
  

  
  return (
    
      <MainLayout>
      <StyledNotesList>
          <StyledH1>My Private Notes</StyledH1>;
      <AddNewButton onClick={open} />

          <MantineReactTable table={table}>
          </MantineReactTable>
        {!isLoading && !notes?.length && (
          <StyledH2>Your note list is empty! Enter a new note! </StyledH2>
        )}
      </StyledNotesList>
        <Modal opened={opened} close={close} title="Modal title"/>

      </MainLayout>
  );
};


type Note = {
  id: string;
  title: string;
  created: string;
  content: string;
};