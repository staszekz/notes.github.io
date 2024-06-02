import { useState } from 'react';
import { MainLayout } from '@notes/layout';
import {
  getTableControls,
  openDeleteModal,
  openDetailsModal,
  openTodoModal,
  StyledH1,
  StyledH2,
  Table,
  TableControls
} from '@notes/components';

import { useRemoteData } from '@notes/hooks';
import { StyledNotesList } from 'src/components/views/Notes/styled';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable
} from '@tanstack/react-table';
import { ControlConfig, Todo } from '@notes/types';
import { AddNewButton } from 'src/components/button-link/add-new-button';
import { Checkbox, Flex } from '@mantine/core';
import dayjs from 'dayjs';
import { IconBubbleText, IconEdit, IconTrash } from '@tabler/icons-react';

export const Todos = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const {
    collection: { isPending, isFetching, isLoading, data: todos },
    addElement,
    editElement,
    deleteElement
  } = useRemoteData({ key: 'todos' });

  const columnHelper = createColumnHelper<Todo>();

  const controlsConfig: ControlConfig<Todo> = {
    Edit: {
      onClick: original => openTodoModal(original, editElement.mutate),
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
      onClick: original => openDetailsModal(original.extraContent),
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
    columnHelper.accessor('created', {
      header: 'Created'
    }),
    columnHelper.accessor('extraContent', {
      header: 'Extra Content'
    }),
    columnHelper.accessor('deadline', {
      header: 'Deadline',
      cell: props => {
        return <span>{dayjs(props.cell.getValue()).format('YYYY/MM/DD')}</span>;
      }
    }),
    columnHelper.accessor('completed', {
      header: 'Completed',
      cell: props => {
        return (
          <Flex gap="md" justify="center">
            <Checkbox
              color={'var(--primary)'}
              variant="outline"
              onChange={e => {
                editElement.mutate({ element: { ...props.row.original, completed: e.target.checked } });
              }}
              checked={props.cell.getValue()}
            />
          </Flex>
        );
      }
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
    data: todos || [],
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <>
      <MainLayout>
        <StyledNotesList>
          <StyledH1>My Private Todo tasks</StyledH1>
          <AddNewButton openModal={openTodoModal} />
          <br />
          <Table table={table} isLoading={isPending || isLoading || isFetching} />
          {!todos?.length && <StyledH2>Your todo list is empty! Enter a new task! </StyledH2>}
        </StyledNotesList>
      </MainLayout>
    </>
  );
};
