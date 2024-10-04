import { createFileRoute } from '@tanstack/react-router';
import { TodosTable, DataDisplay } from '@notes/components';
import { Box, LoadingOverlay } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getTodosQueryOptions } from '@notes/rq';
import { Suspense } from 'react';
import { Spinner } from 'src/components/atoms/spinner/spinner';

export const Route = createFileRoute('/_auth/_main-layout/todos')({
  component: () => (
    <Suspense
      fallback={
        <LoadingOverlay
          overlayProps={{ color: 'var(--dark-bg-color)' }}
          loaderProps={{ children: <Spinner /> }}
          visible
        />
      }
    >
      <Todos />
    </Suspense>
  )
});

function Todos() {
  const { data: todos } = useSuspenseQuery(getTodosQueryOptions());
  return (
    <DataDisplay
      isData={Boolean(todos?.length)}
      title="My Private Todos"
      Table={TodosTable}
      Stickers={() => <Box style={{ color: 'white' }}>strckers</Box>}
      Tiles={() => <Box style={{ color: 'white' }}>Tiles</Box>}
    />
  );
}
// uzyć useInView z useInfiniteQuery z kursu
