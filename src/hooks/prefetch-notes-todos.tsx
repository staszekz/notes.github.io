import { notesQueries, todosQueries } from '@notes/rq';
import { useQueryClient } from '@tanstack/react-query';

export function usePrefetchNotesTodos() {
  const queryClient = useQueryClient();

  async function prefetchNotes() {
    await queryClient.prefetchQuery(notesQueries.allNotes());
  }
  async function prefetchTodos() {
    await queryClient.prefetchQuery(todosQueries.allTodos());
  }
  return {
    prefetchNotes,
    prefetchTodos
  };
}
