import { addElementFn } from '@notes/rq';
import { CollectionType, Todo } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const key = CollectionType.TODOS

export const useAddTodo = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ element }: { element: Todo }): Promise<void> => addElementFn({ element, key }),
    onMutate: async ({ element }: { element: Todo }) => {
      await queryClient.cancelQueries({ queryKey: [key] })
      const previousNotes = queryClient.getQueryData([key]) as Todo[]
      const newNotes = [element, ...previousNotes]
      queryClient.setQueryData([key], newNotes)
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
    addTodo: mutation.mutate,
    isTodoAdding: mutation.isPending,
    isTodoAddError: mutation.isError
  }

};


