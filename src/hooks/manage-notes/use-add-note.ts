import { addElementFn, notesQueries } from '@notes/rq';
import { CollectionType, Note } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorNotification } from '../notifications/error-notification';

const queryKey = notesQueries.allNotes().queryKey;

export const useAddNote = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ element }: { element: Note }): Promise<void> =>
      addElementFn({ element, key: CollectionType.NOTES }),
    onMutate: async ({ element }: { element: Note }) => {
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
      errorNotification({ message: error?.message });
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
