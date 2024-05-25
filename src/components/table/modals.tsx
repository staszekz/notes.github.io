import React from 'react';
import { Title, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { AddTask } from '../Form/Form';

type Note = {
  title: string;
  created: string;
  content: string;
};

export const openModal = (data: Note, editNote) => {
  return modals.open({
    title: <Title size={'1.5rem'}>{data ? 'Edit: ' : 'Add:'}</Title>,
    centered: true,
    children: <AddTask data={data} editNote={editNote} />
  });
};

export const openDeleteModal = (id: string, deleteFn) => {
  return modals.openConfirmModal({
    title: 'Delete note',
    centered: true,
    children: 'Are you sure you want to delete this note?',
    labels: {
      confirm: 'Delete',
      cancel: 'Cancel'
    },
    confirmProps: { color: 'red' },
    onConfirm: () => deleteFn({ id })
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
