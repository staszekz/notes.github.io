import { addElementFn } from '@notes/rq';
import { CollectionType, Todo } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const key = CollectionType.TODOS

export const useAddTodo = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (element: Todo): Promise<void> => addElementFn({ element, key }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] })
    }
  });

  return {
    ...mutation,
    addTodo: mutation.mutate,
    isTodoAdding: mutation.isPending,
    isTodoAddError: mutation.isError
  }

};


