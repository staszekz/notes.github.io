import { addElementFn } from '@notes/rq';
import { CollectionType, Note } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const key = CollectionType.NOTES

export const useAddNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (element: Note): Promise<void> => addElementFn({ element, key }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] })
    }
  });

};


