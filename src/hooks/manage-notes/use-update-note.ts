import { editSingleElementFn } from '@notes/rq';
import { CollectionType, Note, NoteWithId } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const key = CollectionType.NOTES

export const useUpdateNote = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ element, id }: { element: Note; id: string }): Promise<void> =>
      editSingleElementFn({ element, key, id }),
    onMutate: async ({ element, id }) => {
      await queryClient.cancelQueries({ queryKey: [key] })
      const previousNotes = queryClient.getQueryData([key]) as NoteWithId[]
      const newNotes = previousNotes.map(note => (note.id === id ? element : note))
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
    updateNote: mutation.mutate,
    isNoteUpdating: mutation.isPending,
    isNoteUpdateError: mutation.isError
  }
};


