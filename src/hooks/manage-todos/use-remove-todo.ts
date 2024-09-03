import { deleteSingleElementFn } from '@notes/rq';
import { CollectionType } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const key = CollectionType.TODOS

export const useRemoveTodo = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (id: string): Promise<void> => deleteSingleElementFn({ id, key }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] })
    }
  });

  return {
    ...mutation,
    removeTodo: mutation.mutate,
    isTodoRemoving: mutation.isPending,
    isTodoRemoveError: mutation.isError
  }
};


