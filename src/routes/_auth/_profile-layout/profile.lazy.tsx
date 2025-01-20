import { createLazyFileRoute } from '@tanstack/react-router';
import { useCounts } from '../../../hooks/counts/use-counts';
import { Skeleton } from '@mantine/core';

export const Route = createLazyFileRoute('/_auth/_profile-layout/profile')({
  component: Profile
});

function Profile() {
  const { todosCount, notesCount, todosIsPending, notesIsPending } = useCounts();
  return (
    <div>
      <h1>Profile, liczba todo-sów to:</h1>{' '}
      {todosIsPending ? <Skeleton height={50} circle mb="xl" /> : <h1>{todosCount}</h1>}
      <h1>Profile, liczba note-sów to:</h1>{' '}
      {notesIsPending ? <Skeleton height={50} circle mb="xl" /> : <h1>{notesCount}</h1>}
    </div>
  );
}
