import { deleteSingleElementFn, todosQueries } from '@notes/rq';
import { CollectionType } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRemoveTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string): Promise<void> => deleteSingleElementFn({ id, key: CollectionType.TODOS }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: todosQueries.allTodos().queryKey });
    }
  });

  return {
    ...mutation,
    removeTodo: mutation.mutate,
    isTodoRemoving: mutation.isPending,
    isTodoRemoveError: mutation.isError
  };
};
