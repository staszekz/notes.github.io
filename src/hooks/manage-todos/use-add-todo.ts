import { addElementFn, todosQueries } from '@notes/rq';
import { CollectionType, Todo, TodoWithId } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const queryKey = todosQueries.allTodos().queryKey;

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ element }: { element: Todo }): Promise<void> =>
      addElementFn({ element, key: CollectionType.TODOS }),
    onMutate: async ({ element }: { element: Todo }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousTotes = queryClient.getQueryData(queryKey) as Todo[];
      const newNotes = [element, ...previousTotes];
      queryClient.setQueryData(queryKey, newNotes as TodoWithId[]);
      return () => {
        queryClient.setQueryData(queryKey, previousTotes as TodoWithId[]);
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
