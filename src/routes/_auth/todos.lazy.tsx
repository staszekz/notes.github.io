import { createLazyFileRoute } from '@tanstack/react-router';
import { TodosTable, DataDisplay } from '@notes/components';
import { Box } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getTodosQueryOptions } from '@notes/rq';

export const Route = createLazyFileRoute('/_auth/todos')({
  component: Todos
});

function Todos() {
  const { data: notes } = useQuery(getTodosQueryOptions());
  return (
    <DataDisplay
      isData={Boolean(notes?.length)}
      title="My Private Notes"
      Table={TodosTable}
      Stickers={() => <Box style={{ color: 'white' }}>strckers</Box>}
      Tiles={() => <Box style={{ color: 'white' }}>Tiles</Box>}
    />
  );
}
// uzyć useInView z useInfiniteQuery z kursu
