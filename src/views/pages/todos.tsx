import { TodosTable } from '@notes/components';
import { Box } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getTodosQueryOptions } from '@notes/rq';
import { DataDisplay } from 'src/components/templates/data-display';

export const Todos = () => {
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
};
// uzyć useInView z useInfiniteQuery z kursu
