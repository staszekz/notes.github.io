import { addElementFn } from '@notes/rq';
import { CollectionType, Todo } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const key = CollectionType.TODOS

export const useAddTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (element: Todo): Promise<void> => addElementFn({ element, key }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] })
    }
  });

};


