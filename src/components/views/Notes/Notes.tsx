import React, { useEffect, useState } from 'react';
import { StyledH1, StyledH2, Filters, NoteDetails, NoteItem, Modal } from '@notes/components';
import { useDispatch, useSelector } from 'react-redux';
import { StyledNotesList } from './styled';
import { RootState, fetchNotes, deleteNote, toggleModalOpen } from '@notes/redux';
import { GlobalStyle } from '@notes/theme';
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


export const Notes = () => {
  // const { notes, isLoading, error } = useSelector((state: RootState) => ({
  //   notes: state.notesReducer.notes,
  //   isLoading: state.notesReducer.isLoading,
  //   error: state.notesReducer.error,
  // }));

const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchNotes());
  //   // eslint-disable-next-line
  // }, []);

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

  const handleFetchNotes = () => dispatch(fetchNotes());
  const handleDeleteNote = (id: string) => {
    console.log('🚀 ~ id:', id)
    
    dispatch(deleteNote(id))
  };

const columns = useMemo<MRT_ColumnDef<Note>[]>(() => [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'created', header: 'Created' },
  { accessorKey: 'content', header: 'Content' },
], []);

  const { isModalOpen } = useSelector((state: RootState) => state.modalReducer);
const {isPending,isLoading, data: notes} = useNotes()
  console.log('🚀 ~ data:', notes)

  
  const table = useMantineReactTable({
    columns,
    data: notes,
    // createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    // renderEditRowModalContent: (row, close) => (  <Stack>
    //     <Title order={3}>Edit User</Title>
    //    <Modal onAdd={()=> {}} isVisible></Modal>
    //     <Flex justify="flex-end" mt="xl">
    //       <MRT_EditActionButtons variant="text" table={table} row={row} />
    //     </Flex>
    //   </Stack>
    //    ),
     renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Edit">
          <ActionIcon onClick={() => dispatch(toggleModalOpen())}>
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
  
  return (
      <MainLayout onAddFetch={handleFetchNotes} button="true">
        <StyledNotesList>
          <StyledH1>My Private Notes</StyledH1>;
          <Filters
            onTitleFilter={handleFilterTitleChange}
            onContentFilter={handleFilterContentChange}
            titleText={filterTitle}
            contentText={filterContent}
            onClear={clearFilter}
            // onDeadlineFilter={undefined}
            // deadlineText={undefined}
          />
          <MantineReactTable table={table}>
        
          </MantineReactTable>
        </StyledNotesList>
        {!isLoading && !notes.length && (
          <StyledH2>Your note list is empty! Enter a new note! </StyledH2>
        )}
      </MainLayout>
  );
};


type Note = {
  id: string;
  title: string;
  created: string;
  content: string;
};