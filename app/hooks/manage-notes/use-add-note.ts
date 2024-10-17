import { addElementFn } from '@notes/rq';
import { CollectionType, Note } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const key = CollectionType.NOTES

export const useAddNote = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ element }: { element: Note }): Promise<void> => addElementFn({ element, key }),
    onMutate: async ({ element }: { element: Note }) => {
      await queryClient.cancelQueries({ queryKey: [key] })
      const previousNotes = queryClient.getQueryData([key]) as Note[]
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
    addNote: mutation.mutate,
    isNoteAdding: mutation.isPending,
    isNoteAddingError: mutation.isError
  }
};


