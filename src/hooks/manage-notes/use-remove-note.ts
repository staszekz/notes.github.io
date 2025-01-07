import { deleteSingleElementFn, notesQueries } from '@notes/rq';
import { CollectionType } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRemoveNote = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string): Promise<void> => deleteSingleElementFn({ id, key: CollectionType.NOTES }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: notesQueries.allNotes().queryKey });
    }
  });

  return {
    ...mutation,
    removeNote: mutation.mutate,
    isNoteRemoving: mutation.isPending,
    isNoteRemoveError: mutation.isError
  };
};
