import { Checkbox, Flex } from '@mantine/core';
import { Todo, ControlConfig } from '@notes/types';
import { getTableControls } from '@notes/utils';
import { IconEdit, IconTrash, IconBubbleText } from '@tabler/icons-react';
import { createColumnHelper } from '@tanstack/table-core';
import { TableControls, openDeleteModal, openTodoModal, openTodoDetailsModal } from 'src/components/molecules';

const columnHelper = createColumnHelper<Todo>();

// dodać tez last modified on
export const columns = ({ updateTodo, removeTodo }) => [
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
              updateTodo({
                element: { ...props.row.original, completed: e.target.checked }
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
    cell: props => <TableControls controls={getTableControls(props.row.original, controlsConfig({ removeTodo }))} />
  })
];

const controlsConfig = ({ removeTodo }): ControlConfig<Todo> => ({
  Edit: {
    onClick: openTodoModal,
    icon: <IconEdit />,
    color: 'var(--secondary)',
    tooltipMessage: 'Edit this note'
  },
  Delete: {
    onClick: original => openDeleteModal(original.id, removeTodo),
    icon: <IconTrash />,
    color: 'var(--red)',
    tooltipMessage: 'Delete this note'
  },
  Details: {
    onClick: openTodoDetailsModal,
    icon: <IconBubbleText />,
    color: 'var(--primary)',
    tooltipMessage: 'See more details'
  }
});
