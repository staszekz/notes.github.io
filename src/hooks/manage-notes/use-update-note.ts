import { editSingleElementFn, notesQueries } from '@notes/rq';
import { CollectionType, Note } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const queryKey = notesQueries.allNotes().queryKey;

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ element, id }: { element: Note; id: string }): Promise<void> =>
      editSingleElementFn({ element, key: CollectionType.NOTES, id }),
    onMutate: async ({ element, id }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousNotes = queryClient.getQueryData(queryKey);
      if (!previousNotes) return;
      const index = previousNotes.findIndex(todo => todo.id === id);
      if (index === -1) return;

      const newNotes = [...previousNotes];
      newNotes[index] = element;
      queryClient.setQueryData(queryKey, newNotes);
      return () => {
        queryClient.setQueryData(queryKey, previousNotes);
      };
    },
    onError: (error, variables, rollback) => {
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
