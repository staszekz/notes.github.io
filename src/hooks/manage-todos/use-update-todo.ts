import { editSingleElementFn } from '@notes/rq';
import { CollectionType, Todo, TodoWithId } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const key = CollectionType.TODOS

export const useUpdateTodo = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ element, id }: { element: Todo; id: string }): Promise<void> =>
      editSingleElementFn({ element, key, id }),
    onMutate: async ({ element, id }) => {
      await queryClient.cancelQueries({ queryKey: [key] })
      const previousNotes = queryClient.getQueryData([key]) as TodoWithId[]
      const newTodos = previousNotes.map(todo => (todo.id === id ? element : todo))
      queryClient.setQueryData([key], newTodos)
      return () => {
        queryClient.setQueryData([key], previousNotes)
      }
    },
    onError: (error, variables, rollback) => {
      rollback?.()
    },
    onSettled: () => {
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


