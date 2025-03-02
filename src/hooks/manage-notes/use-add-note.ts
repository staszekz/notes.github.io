import { addElementFn, notesQueries } from '@notes/rq';
import { CollectionType, Note } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from '../notifications/notification';

const queryKey = notesQueries.allNotes().queryKey;

export const useAddNote = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ element }: { element: Omit<Note, 'id>'> }) =>
      addElementFn({ element, key: CollectionType.NOTES }),
    onMutate: async ({ element }: { element: Omit<Note, 'id>'> }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousNotes = queryClient.getQueryData(queryKey);
      if (!previousNotes) return;
      const newNotes = [element, ...previousNotes];
      queryClient.setQueryData(queryKey, newNotes);
      return () => {
        queryClient.setQueryData(queryKey, previousNotes);
      };
    },
    onError: (error, variables, rollback) => {
      notification({ message: error?.message, type: 'error', title: 'An error occured' });
      rollback?.();
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
    }
  });

  return {
    ...mutation,
    addNote: mutation.mutate,
    isNoteAdding: mutation.isPending,
    isNoteAddingError: mutation.isError
  };
};
