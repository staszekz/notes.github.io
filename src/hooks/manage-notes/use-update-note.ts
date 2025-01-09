import { editSingleElementFn, notesQueries } from '@notes/rq';
import { CollectionType, Note } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorNotification } from '../notifications/error-notification';

const queryKey = notesQueries.allNotes().queryKey;

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ element }: { element: Note }) =>
      editSingleElementFn({ element, key: CollectionType.NOTES, id: element.id }),
    onMutate: async ({ element }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousNotes = queryClient.getQueryData(queryKey);
      if (!previousNotes) return;
      const index = previousNotes.findIndex(todo => todo.id === element.id);
      if (index === -1) return;

      const newNotes = [...previousNotes];
      newNotes[index] = element;
      queryClient.setQueryData(queryKey, newNotes);
      return () => {
        queryClient.setQueryData(queryKey, previousNotes);
      };
    },
    onError: (error, variables, rollback) => {
      errorNotification({ message: error?.message });
      rollback?.();
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
    }
  });

  return {
    ...mutation,
    updateNote: mutation.mutate,
    isNoteUpdating: mutation.isPending,
    isNoteUpdateError: mutation.isError
  };
};
