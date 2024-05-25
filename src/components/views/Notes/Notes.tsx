import { useState } from 'react';
import { openDeleteModal, openDetailsModal, openModal, StyledH1, StyledH2, Table, TableIcons } from '@notes/components';
import { StyledNotesList } from './styled';
import { MainLayout } from '@notes/layout';
import { useRemoteData } from '@notes/hooks';
import { AddNewButton } from 'src/components/button-link/add-new-button';

import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable
} from '@tanstack/react-table';
import { Note } from '@notes/types';

export const Notes = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const {
    collection: { isPending, isFetching, isLoading, data: notes },
    addElement,
    editElement,
    deleteElement
  } = useRemoteData<Note>({ key: 'notes' });

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
            openDeleteModal={() => openDeleteModal(props.row.original.id as string, deleteElement.mutate)}
            openEditModal={() => openModal(props.row.original, editElement.mutate)}
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
