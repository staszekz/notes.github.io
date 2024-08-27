import { addElementFn } from '@notes/rq';
import { CollectionType, Note } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const key = CollectionType.NOTES

export const useAddNote = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (element: Note): Promise<void> => addElementFn({ element, key }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] })
    }
  });

  return {
    ...mutation,
    addNote: mutation.mutate,
    isNoteAdding: mutation.isPending,
    isNoteAddingError: mutation.isError
  }
};


