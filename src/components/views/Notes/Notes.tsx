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
import { CollectionType, Note, RemoteNote } from '@notes/types';

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
  } = useRemoteData<Note, RemoteNote>({ key: CollectionType.NOTES });

  const columnHelper = createColumnHelper<Note>();
  // TODO: zrobic tez zeby mozna było właczac edycja z modal od detailsów

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
    columnHelper.accessor('created', {
      header: 'Created'
    }),
    columnHelper.accessor('content', {
      header: 'Content'
    }),
    columnHelper.display({
      header: 'Actions',
      cell: <TableControls controls = {  // createEditControl :) 
        [{
          onClick: openDetailsModal,
          icons: <EditIcon/>,
          tooltipMessage: 'gsdjgfkshd',

          openDeleteModal: openDeleteModal,
          openEditModal: openModal
        }]
      } />
      }
      // cell: props => {
      //   return (
      //     <TableIcons
      //       openDetailsModal={() => openDetailsModal(props.row.original.content)}
      //       openDeleteModal={() => openDeleteModal(props.row.original.id as string, deleteElement.mutate)}
      //       openEditModal={() => openModal(props.row.original, editElement.mutate)}
      //     />
      //   );
      // }
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
        <Table table={table} isLoading={isLoading || isFetching} />
        {!notes?.length && <StyledH2>Your note list is empty! Enter a new note! </StyledH2>}
      </StyledNotesList>
    </MainLayout>
  );
};
