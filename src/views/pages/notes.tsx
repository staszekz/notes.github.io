import { useState } from 'react';
import {
  AddNewButton,
  NotesHeader,
  openDeleteModal,
  openDetailsModal,
  openNoteModal,
  Table,
  TableControls
} from '@notes/components';
import { MainLayout } from '@notes/layout';
import { useRemoteData } from '@notes/hooks';

import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable
} from '@tanstack/react-table';
import { CollectionType, ControlConfig, Note, NoteWithId } from '@notes/types';
import { IconBubbleText, IconEdit, IconTrash } from '@tabler/icons-react';
import { Box } from '@mantine/core';
import classes from './styles.module.css';
import { getTableControls } from '@notes/utils';

export const Notes = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const {
    collection: { isPending, isFetching, isLoading, data: notes },
    deleteElement
  } = useRemoteData<Note>({ key: CollectionType.NOTES });

  const columnHelper = createColumnHelper<NoteWithId>();
  // TODO: zrobic tez zeby mozna było właczac edycja z modal od detailsów

  const controlsConfig: ControlConfig<NoteWithId> = {
    Edit: {
      onClick: openNoteModal,
      icon: <IconEdit />,
      color: 'var(--secondary)',
      tooltipMessage: 'Edit this note'
    },
    Delete: {
      onClick: original => openDeleteModal(original.id, deleteElement.mutate),
      icon: <IconTrash />,
      color: 'var(--red)',
      tooltipMessage: 'Delete this note'
    },
    Details: {
      onClick: original => openDetailsModal(original.content),
      icon: <IconBubbleText />,
      color: 'var(--primary)',
      tooltipMessage: 'See more details'
    }
  };

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
    columnHelper.accessor('createdOn', {
      header: 'Created',
      cell: props => {
        return <span>{props.row.original.createdOn.toDate().toLocaleString()}</span>;
      }
    }),
    columnHelper.accessor('content', {
      header: 'Content'
    }),
    columnHelper.display({
      header: 'Actions',
      cell: props => <TableControls controls={getTableControls(props.row.original, controlsConfig)} />
    })
  ];

  const table = useReactTable({
    // TODO: get Table type
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
      <Box className={classes.list}>
        <NotesHeader component="h1">My Private Notes</NotesHeader>
        <AddNewButton openModal={openNoteModal} />
        <br />
        <Table<NoteWithId> table={table} isLoading={isPending || isLoading || isFetching} />
        {!notes?.length && <NotesHeader component="h2">Your note list is empty! Enter a new note! </NotesHeader>}
      </Box>
    </MainLayout>
  );
};
// zrobić tak żeby można było edytować notatki z modalu details
