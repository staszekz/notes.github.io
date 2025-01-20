import { useQueries, useSuspenseQueries } from '@tanstack/react-query';
import { notesQueries, todosQueries } from '@notes/rq';

export const useCounts = () => {
  const {
    [0]: { data: todosCount, error: todosError, isPending: todosIsPending },
    [1]: { data: notesCount, error: notesError, isPending: notesIsPending }
  } = useQueries({
    queries: [todosQueries.todosCount(), notesQueries.notesCount()]
  });

  return { todosCount, notesCount, todosIsPending, notesIsPending };
};
