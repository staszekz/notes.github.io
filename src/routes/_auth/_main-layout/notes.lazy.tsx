import { createLazyFileRoute } from '@tanstack/react-router';

import { NotesTable, DataDisplay } from '@notes/components';
import { useQuery } from '@tanstack/react-query';
import { getNotesQueryOptions } from '@notes/rq';
import { Box } from '@mantine/core';

export const Route = createLazyFileRoute('/_auth/_main-layout/notes')({
  component: Notes,
  pendingComponent: () => {
    console.log('pendingComponent');
    return <div>Loading...</div>;
  }
});

function Notes() {
  const { data: notes } = useQuery(getNotesQueryOptions());

  return (
    <DataDisplay
      isData={Boolean(notes?.length)}
      title="My Private Notes"
      Table={NotesTable}
      Stickers={() => <Box style={{ color: 'white' }}>strckers</Box>}
      Tiles={() => <Box style={{ color: 'white' }}>Tiles</Box>}
    />
  );
}
