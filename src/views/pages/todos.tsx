import { useState } from 'react';
import { MainLayout } from '@notes/layout';
import {
  AddNewButton,
  openDeleteModal,
  openDetailsModal,
  openTodoModal,
  NotesHeader,
  Table,
  TableControls
} from '@notes/components';

import { useRemoteData } from '@notes/hooks';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable
} from '@tanstack/react-table';
import { CollectionType, ControlConfig, Todo, TodoWithId } from '@notes/types';
import { Box, Checkbox, Flex } from '@mantine/core';
import { IconBubbleText, IconEdit, IconTrash } from '@tabler/icons-react';
import classes from './styles.module.css';
import { getTableControls } from '@notes/utils';

export const Todos = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const {
    collection: { isPending, isFetching, isLoading, data: todos },
    editElement,
    deleteElement
  } = useRemoteData<Todo>({ key: CollectionType.TODOS });

  const columnHelper = createColumnHelper<TodoWithId>();

  const controlsConfig: ControlConfig<TodoWithId> = {
    Edit: {
      onClick: openTodoModal,
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
    columnHelper.accessor('createdOn', {
      header: 'Created',
      cell: props => {
        return <span>{props.row.original.createdOn.toDate().toLocaleString()}</span>;
      }
    }),
    columnHelper.accessor('extraContent', {
      header: 'Extra Content'
    }),
    columnHelper.accessor('deadline', {
      header: 'Deadline',
      cell: props => {
        return <span>{props.cell.getValue()?.toDate().toLocaleString() || '---'}</span>;
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
                editElement.mutate({
                  element: { ...props.row.original, completed: e.target.checked },
                  id: props.row.original.id
                });
              }}
              checked={props.cell.getValue()}
            />
          </Flex>
        );
      }
    }),
    columnHelper.display({
      header: 'Actions',
      cell: props => <TableControls controls={getTableControls(props.row.original, controlsConfig)} />
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
    <MainLayout>
      <Box className={classes.list}>
        <NotesHeader component="h1">My Private Todo tasks</NotesHeader>
        <AddNewButton openModal={openTodoModal} />
        <br />
        <Table<TodoWithId> table={table} isLoading={isPending || isLoading || isFetching} />
        {!todos?.length && <NotesHeader component="h2">Your todo list is empty! Enter a new task! </NotesHeader>}
      </Box>
    </MainLayout>
  );
};
