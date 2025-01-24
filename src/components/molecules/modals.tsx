import { Title, Text, Button, Flex, Divider } from '@mantine/core';
import { modals } from '@mantine/modals';
import { NoteManagementForm, ResetPasswordForm, TodoManagementForm } from '@notes/components';
import { Note, Todo } from '@notes/types';
import { MutateOptions } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';

export function openNoteModal(data?: Note) {
  return modals.open({
    title: <Title size={'1.5rem'}>{data ? 'Edit: ' : 'Add:'}</Title>,
    centered: true,
    overlayProps: {
      backgroundOpacity: 0.55,
      blur: 3
    },
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
export function openTodoModal(data?: Todo) {
  return modals.open({
    title: <Title size={'1.5rem'}>{data ? 'Edit: ' : 'Add:'}</Title>,
    centered: true,
    overlayProps: {
      backgroundOpacity: 0.55,
      blur: 3
    },
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
    overlayProps: {
      backgroundOpacity: 0.55,
      blur: 3
    },
    confirmProps: { fz: 'md', variant: 'notes-danger' },
    cancelProps: { fz: 'md' },
    onConfirm: () => deleteFn(id)
  });
};

export function openTodoDetailsModal(data?: Todo) {
  modals.open({
    title: (
      <Text fw={700} size="lg">
        Details:
      </Text>
    ),
    centered: true,
    overlayProps: {
      backgroundOpacity: 0.55,
      blur: 3
    },
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

export function openNoteDetailsModal(data?: Note) {
  modals.open({
    title: (
      <Text fw={700} size="lg">
        Details:
      </Text>
    ),
    overlayProps: {
      backgroundOpacity: 0.55,
      blur: 3
    },
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

function closeModalAndShowSnackbar() {
  modals.closeAll();
  notifications.show({
    title: 'Password reset',
    message: 'E-mail with instruction to reset password has been sent',
    color: 'var(--primary)',
    position: 'top-center',
    autoClose: 5000,
    withCloseButton: true
  });
}
export function openResetModal() {
  modals.open({
    title: (
      <Text fw={700} size="lg">
        Reset Password
      </Text>
    ),
    id: 'reset-password',
    overlayProps: {
      backgroundOpacity: 0.55,
      blur: 3
    },
    centered: true,
    children: <ResetPasswordForm onSubmit={closeModalAndShowSnackbar} />
  });
}
