import { addElementFn, todosQueries } from '@notes/rq';
import { CollectionType, Todo } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorNotification } from '../notifications/error-notification';

const queryKey = todosQueries.allTodos().queryKey;

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ element }: { element: Omit<Todo, 'id>'> }) =>
      addElementFn({ element, key: CollectionType.TODOS }),
    onMutate: async ({ element }: { element: Omit<Todo, 'id>'> }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousTotes = queryClient.getQueryData(queryKey);
      if (!previousTotes) return;
      const newNotes = [element, ...previousTotes];
      queryClient.setQueryData(queryKey, newNotes);
      return () => {
        queryClient.setQueryData(queryKey, previousTotes);
      };
    },
    onError: (error, variables, rollback) => {
      errorNotification({ message: error?.message });
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
