import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Box, LoadingOverlay } from '@mantine/core';

import { NotesTable, DataDisplay, NotesStickers } from '@notes/components';
import { getNotesQueryOptions } from '@notes/rq';
import { Suspense } from 'react';
import { Spinner } from 'src/components/atoms/spinner/spinner';

export const Route = createFileRoute('/_auth/_main-layout/notes')({
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
      <Notes />
    </Suspense>
  )
});

function Notes() {
  const { data: notes } = useSuspenseQuery(getNotesQueryOptions());
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
