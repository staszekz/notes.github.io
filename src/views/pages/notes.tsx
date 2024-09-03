import { useState } from 'react';
import {
  AddNewButton,
  openDeleteModal,
  openNoteDetailsModal,
  openNoteModal,
  Table,
  TableControls
} from '@notes/components';
import { MainLayout } from '@notes/layout';
import { useRemoveNote } from '@notes/hooks';

import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable
} from '@tanstack/react-table';
import { ControlConfig, NoteWithId } from '@notes/types';
import { IconBubbleText, IconEdit, IconTrash } from '@tabler/icons-react';
import { Title } from '@mantine/core';
import { getTableControls } from '@notes/utils';
import { useQuery } from '@tanstack/react-query';
import { getNotesQueryOptions } from '@notes/rq';

export const Notes = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const { data: notes, isPending, isFetching, isLoading } = useQuery(getNotesQueryOptions());
  const { removeNote } = useRemoveNote();

  const columnHelper = createColumnHelper<NoteWithId>();

  const controlsConfig: ControlConfig<NoteWithId> = {
    Edit: {
      onClick: openNoteModal,
      icon: <IconEdit />,
      color: 'var(--secondary)',
      tooltipMessage: 'Edit this note'
    },
    Delete: {
      onClick: original => openDeleteModal(original.id, removeNote),
      icon: <IconTrash />,
      color: 'var(--red)',
      tooltipMessage: 'Delete this note'
    },
    Details: {
      onClick: openNoteDetailsModal,
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
      <Title pt="xl" order={2}>
        My Private Notes
      </Title>
      <AddNewButton openModal={openNoteModal} />
      <br />
      <Table<NoteWithId> table={table} isLoading={isPending || isLoading || isFetching} />
      {!notes?.length && <Title order={3}>Your note list is empty! Enter a new note! </Title>}
    </MainLayout>
  );
};
