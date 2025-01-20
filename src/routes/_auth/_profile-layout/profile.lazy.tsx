import { createLazyFileRoute } from '@tanstack/react-router';
import { notesQueries, todosQueries } from '@notes/rq';
import { useSuspenseQueries, useQuery } from '@tanstack/react-query';

export const Route = createLazyFileRoute('/_auth/_profile-layout/profile')({
  component: Profile
});

function Profile() {
  const {
    [0]: { data: todosCount },
    [1]: { data: notesCount }
  } = useSuspenseQueries({
    queries: [todosQueries.todosCount(), notesQueries.notesCount()]
  });
  console.log('Todos Count:', todosCount);
  console.log('Notes Count:', notesCount);
  return (
    <div>
      <h1>Profile, liczba todo-sów to: {todosCount}</h1>
      <h1>Profile, liczba note-sów to: {notesCount}</h1>
    </div>
  );
}
