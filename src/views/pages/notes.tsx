import { AddNewButton, openNoteModal, NotesTable } from '@notes/components';
import { MainLayout } from '@notes/layout';

import { Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getNotesQueryOptions } from '@notes/rq';

export const Notes = () => {
  const { data: notes } = useQuery(getNotesQueryOptions());

  return (
    <MainLayout>
      <Title pt="xl" order={2}>
        My Private Notes
      </Title>
      <AddNewButton openModal={openNoteModal} />
      <br />
      <NotesTable isLoading={!notes?.length} />
      {!notes?.length && <Title order={3}>Your note list is empty! Enter a new note! </Title>}
    </MainLayout>
  );
};
