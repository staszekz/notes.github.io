import { createLazyFileRoute } from '@tanstack/react-router';
import { todosQueries } from '@notes/rq';
import { useQuery } from '@tanstack/react-query';

export const Route = createLazyFileRoute('/_auth/_profile-layout/profile')({
  component: Profile
});

function Profile() {
  const { data } = useQuery(todosQueries.todosCount());
  return (
    <div>
      <h1>Profile, liczba totosów to: {data} </h1>
    </div>
  );
}
