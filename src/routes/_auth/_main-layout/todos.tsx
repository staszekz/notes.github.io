import { createFileRoute } from '@tanstack/react-router';
import { TodosTable, DataDisplay, TodosStickers } from '@notes/components';
import { Box } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';
import { todosQueries } from '@notes/rq';

export const Route = createFileRoute('/_auth/_main-layout/todos')({
  component: () => <Todos />
});

function Todos() {
  const { data: todos } = useSuspenseQuery(todosQueries.allTodos());
  return (
    <DataDisplay
      isData={Boolean(todos?.length)}
      title="My Private Todos"
      Table={TodosTable}
      Stickers={TodosStickers}
      Tiles={() => <Box style={{ color: 'white' }}>Tiles</Box>}
    />
  );
}
// uzyć useInView z useInfiniteQuery z kursu
