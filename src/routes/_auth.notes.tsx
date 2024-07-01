import { Notes } from '@notes/components';
import { getCollection } from '@notes/rq';
import { CollectionType, Todo } from '@notes/types';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

const notesOptions = queryOptions({
  queryKey: [CollectionType.NOTES],
  queryFn: () => getCollection<Todo>({ key: CollectionType.NOTES })
});

export const Route = createFileRoute('/_auth/notes')({
  loader: ({ context }) => context.queryClient.ensureQueryData(notesOptions),
  component: () => {
    const { data } = useSuspenseQuery(notesOptions);
    console.log('🚀 ~ data:', data);

    return <Notes notes={data} />;
  }
});
