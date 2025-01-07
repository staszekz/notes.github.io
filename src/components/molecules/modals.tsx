import { Title, Text, Button, Flex, Divider } from '@mantine/core';
import { modals } from '@mantine/modals';
import { NoteManagementForm, TodoManagementForm } from '@notes/components';
import { NoteWithId, TodoWithId } from '@notes/types';
import { MutateOptions } from '@tanstack/react-query';

export function openNoteModal(data?: NoteWithId) {
  return modals.open({
    title: <Title size={'1.5rem'}>{data ? 'Edit: ' : 'Add:'}</Title>,
    centered: true,
    children: <NoteManagementForm data={data} />
  });
}

// TODO: dodać jakis SnackBAr z info co się dzije i można to z mutacji wziac. Globalny state context lub useQUery ?
// onSuccess: (newUser) => {
//     alert(`name updated to ${newUser.name}`)
//   }
// })
//  onSuccess: newUser => {
//    queryClient.setQueryData(['user', newUser.id], newUser);
//  };
// We saw that when React Query invokes onSuccess, the first argument it'll pass to it is whatever the mutationFn returns. That's nice, but in this case, it's the second argument that is more valuable to us.

// It'll be the object that was passed to mutate, in our example, { id, newName }.

// function useUpdateUser() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: updateUser,
//     onSuccess: (data, { id, newName }) => {

//     }
//   })
// }
export function openTodoModal(data?: TodoWithId) {
  return modals.open({
    title: <Title size={'1.5rem'}>{data ? 'Edit: ' : 'Add:'}</Title>,
    centered: true,
    children: <TodoManagementForm data={data} />
  });
}

export const openDeleteModal = (
  id: string,
  deleteFn: {
    (variables: string, options?: MutateOptions<void, Error, string, unknown> | undefined): void;
    (variables: string, options?: MutateOptions<void, Error, string, unknown> | undefined): void;
    (arg0: string): void;
  }
) => {
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

export function openTodoDetailsModal(data?: TodoWithId) {
  modals.open({
    title: (
      <Text fw={700} size="lg">
        Details:
      </Text>
    ),
    centered: true,
    children: (
      <>
        <Text ta="center" size="xl">
          {data?.content}
        </Text>
        <Divider my="md" />
        <Flex justify={'flex-end'}>
          <Button onClick={() => openTodoModal(data)} variant="light" fz={'md'}>
            Edit Todo
          </Button>
        </Flex>
      </>
    )
  });
}

export function openNoteDetailsModal(data?: NoteWithId) {
  modals.open({
    title: (
      <Text fw={700} size="lg">
        Details:
      </Text>
    ),
    centered: true,
    children: (
      <>
        <Text ta="center" size="xl">
          {data?.content}
        </Text>
        <Divider my="md" />
        <Flex justify={'flex-end'}>
          <Button onClick={() => openNoteModal(data)} variant="light" fz={'md'}>
            Edit Note
          </Button>
        </Flex>
      </>
    )
  });
}
