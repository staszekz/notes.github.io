import { getNotesQueryOptions, getTodosQueryOptions } from '@notes/rq';
import { useQueryClient } from '@tanstack/react-query';

export function usePrefetchNotesTodos() {
  const queryClient = useQueryClient();

  function prefetchNotes() {
    queryClient.prefetchQuery(getNotesQueryOptions());
  }
  function prefetchTodos() {
    queryClient.prefetchQuery(getTodosQueryOptions());
  }
  return {
    prefetchNotes,
    prefetchTodos
  };
}
