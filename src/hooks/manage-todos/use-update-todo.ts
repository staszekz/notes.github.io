import { editSingleElementFn, todosQueries } from '@notes/rq';
import { CollectionType, Todo } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorNotification } from 'src/hooks/notifications/error-notification';

const queryKey = todosQueries.allTodos().queryKey;

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ element, id }: { element: Todo; id: string }): Promise<void> =>
      editSingleElementFn({ element, key: CollectionType.TODOS, id }),
    onMutate: async ({ element, id }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousTodos = queryClient.getQueryData(queryKey);
      if (!previousTodos) return;

      const index = previousTodos.findIndex(todo => todo.id === id);
      if (index === -1) return;

      const newTodos = [...previousTodos];
      newTodos[index] = element;

      queryClient.setQueryData(queryKey, newTodos);
      return () => {
        queryClient.setQueryData(queryKey, previousTodos);
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
    updateTodo: mutation.mutate,
    isTodoUpdating: mutation.isPending,
    isTodoUpdateError: mutation.isError
  };
};
