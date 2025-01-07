import { addElementFn, todosQueries } from '@notes/rq';
import { CollectionType, Todo } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const queryKey = todosQueries.allTodos().queryKey;

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ element }: { element: Todo }): Promise<void> =>
      addElementFn({ element, key: CollectionType.TODOS }),
    onMutate: async ({ element }: { element: Todo }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousNotes = queryClient.getQueryData(queryKey);
      const newNotes = [element, ...previousNotes];
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
    addTodo: mutation.mutate,
    isTodoAdding: mutation.isPending,
    isTodoAddError: mutation.isError
  };
};
