import { Title, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { NoteManagementForm, TodoManagementForm } from '@notes/components';
import { NoteWithId, TodoWithId } from '@notes/types';
// import { primary } from '@notes/utils';

export function openNoteModal(data?: NoteWithId) {
  return modals.open({
    title: <Title size={'1.5rem'}>{data ? 'Edit: ' : 'Add:'}</Title>,
    centered: true,
    children: <NoteManagementForm data={data} />
  });
}

export function openTodoModal(data?: TodoWithId) {
  return modals.open({
    title: <Title size={'1.5rem'}>{data ? 'Edit: ' : 'Add:'}</Title>,
    centered: true,
    children: <TodoManagementForm data={data} />
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
    confirmProps: { fz: 'md', variant: 'notes-danger' },
    cancelProps: { fz: 'md' },
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
