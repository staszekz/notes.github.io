import { createFileRoute } from '@tanstack/react-router';

import { Flex, Title } from '@mantine/core';
import { usePrefetchNotesTodos } from '@notes/hooks';
import { ButtonLink } from '@notes/components';

export const Route = createFileRoute('/_auth/_main-layout/')({
  component: Home
});

function Home() {
  const { prefetchTodos, prefetchNotes } = usePrefetchNotesTodos();

  return (
    <>
      <Title pt="xl" order={2}>
        In this app you can store your:{' '}
      </Title>
      <Flex gap={'lg'} mt="xl" justify={'center'}>
        <ButtonLink variant="notes-transparent-border" size="large" onMouseEnter={prefetchTodos} to={'/todos'}>
          todos
        </ButtonLink>
        <ButtonLink variant="notes-transparent-border" size="large" onMouseEnter={prefetchNotes} to={'/notes'}>
          notes
        </ButtonLink>
      </Flex>
    </>
  );
}

// TODO: Add unit test for form
// TODO: Add cypress test for the whole page
// TODO: Add error messages and confirmations
// TODO: add user profile edit
