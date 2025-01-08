import { editSingleElementFn, todosQueries } from '@notes/rq';
import { CollectionType, Todo, TodoWithId } from '@notes/types';
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
      const previousNotes = queryClient.getQueryData(queryKey) as TodoWithId[];
      const newTodos = previousNotes.map(todo => (todo.id === id ? element : todo));
      queryClient.setQueryData(queryKey, newTodos as TodoWithId[]);
      return () => {
        queryClient.setQueryData(queryKey, previousNotes);
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
