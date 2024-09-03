import { editSingleElementFn } from '@notes/rq';
import { CollectionType, Todo } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const key = CollectionType.TODOS

export const useUpdateTodo = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ element, id }: { element: Todo; id: string }): Promise<void> =>
      editSingleElementFn({ element, key, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] })
    }
  });

  return {
    ...mutation,
    updateTodo: mutation.mutate,
    isTodoUpdating: mutation.isPending,
    isTodoUpdateError: mutation.isError
  }
};


