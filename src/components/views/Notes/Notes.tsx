import { useState } from 'react';
import {
  getTableControls,
  openDeleteModal,
  openDetailsModal,
  openNoteModal,
  StyledH1,
  StyledH2,
  Table,
  TableControls
} from '@notes/components';
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
import { CollectionType, ControlConfig, Note } from '@notes/types';
import { IconBubbleText, IconEdit, IconTrash } from '@tabler/icons-react';

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
  } = useRemoteData<Note>({ key: CollectionType.NOTES });

  const columnHelper = createColumnHelper<Note>();
  // TODO: zrobic tez zeby mozna było właczac edycja z modal od detailsów

  const controlsConfig: ControlConfig<Note> = {
    Edit: {
      onClick: original => openNoteModal(original, editElement.mutate),
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
      cell: props => (
        <TableControls // controls = {   createEditControl :)
          controls={getTableControls(props.row.original, controlsConfig)}
        />
      )
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
        <AddNewButton openNoteModal={openNoteModal} />
        <br />
        <Table table={table} isLoading={isLoading || isFetching} />
        {!notes?.length && <StyledH2>Your note list is empty! Enter a new note! </StyledH2>}
      </StyledNotesList>
    </MainLayout>
  );
};
