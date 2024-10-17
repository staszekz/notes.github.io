import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Box, LoadingOverlay } from '@mantine/core';

import { NotesTable, DataDisplay } from '@notes/components';
import { getNotesQueryOptions } from '@notes/rq';
import { Suspense } from 'react';
import { Spinner } from 'app/components/atoms/spinner/spinner';

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
      Stickers={() => <Box style={{ color: 'white' }}>strckers</Box>}
      Tiles={() => <Box style={{ color: 'white' }}>Tiles</Box>}
    />
  );
}
