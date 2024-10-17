import { deleteSingleElementFn } from '@notes/rq';
import { CollectionType } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const key = CollectionType.NOTES

export const useRemoveNote = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (id: string): Promise<void> => deleteSingleElementFn({ id, key }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] })
    }
  });

  return {
    ...mutation,
    removeNote: mutation.mutate,
    isNoteRemoving: mutation.isPending,
    isNoteRemoveError: mutation.isError
  }
};


