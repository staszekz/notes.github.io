import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { addNote, editSingleNote, getNotes, deleteSingleNote } from '@notes/rq';
import { PaginationState } from '@tanstack/react-table';

export function useNotes() {
  const notes = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const notes = await getNotes();
      return Object.keys(notes)
        .map(key => ({ id: key, ...notes[key] }))
        .reverse();
    },
    staleTime: 30000,
    placeholderData: keepPreviousData
  });

  const addNewNote = useMutation({
    mutationFn: addNote,
    onSettled: () => {
      notes.refetch();
    }
  });

  const editNote = useMutation({
    mutationFn: editSingleNote,
    onSettled: () => {
      notes.refetch();
    }
  });

  const deleteNote = useMutation({
    mutationFn: deleteSingleNote,
    onSettled: () => {
      notes.refetch();
    }
  });

  return { notes, addNewNote, editNote, deleteNote };
}
