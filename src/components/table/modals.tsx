import { Title, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { NoteManagementForm, TodoManagementForm } from '@notes/components';
import { Note, Todo } from '@notes/types';

export function openNoteModal(data: Note, edit: (id: string, element: Note) => void) {
  return modals.open({
    title: <Title size={'1.5rem'}>{data ? 'Edit: ' : 'Add:'}</Title>,
    centered: true,
    children: <NoteManagementForm data={data} editNote={data => edit(id, data)} />
  });
}

export function openTodoModal(data: Todo, edit) {
  return modals.open({
    title: <Title size={'1.5rem'}>{data ? 'Edit: ' : 'Add:'}</Title>,
    centered: true,
    children: <TodoManagementForm data={data} editTodo={edit} />
  });
}

export const openDeleteModal = (id: string, deleteFn) => {
  return modals.openConfirmModal({
    title: 'Delete note',
    centered: true,
    children: 'Are you sure you want to delete this note?',
    labels: {
      confirm: 'Delete',
      cancel: 'Cancel'
    },
    confirmProps: { color: 'var(--red)' },
    onConfirm: () => deleteFn(id)
  });
};

export const openDetailsModal = (content: string) => {
  modals.open({
    title: (
      <Text fw={700} size="lg">
        Details:
      </Text>
    ),
    centered: true,
    children: (
      <Text ta="center" size="xl">
        {content}
      </Text>
    )
  });
};
