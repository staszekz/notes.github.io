import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Box } from '@mantine/core';

import { NotesTable, DataDisplay, NotesStickers } from '@notes/components';
import { notesQueries } from '@notes/rq';

export const Route = createFileRoute('/_auth/_main-layout/notes')({
  component: () => <Notes />
});

function Notes() {
  const res = useSuspenseQuery(notesQueries.allNotes());

  const notes = res.data;
  return (
    <DataDisplay
      isData={Boolean(notes?.length)}
      title="My Private Notes"
      Table={NotesTable}
      Stickers={NotesStickers}
      Tiles={() => <Box style={{ color: 'white' }}>Tiles</Box>}
    />
  );
}
