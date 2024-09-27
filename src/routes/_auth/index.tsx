import { createFileRoute } from '@tanstack/react-router';

import { MainLayout } from '@notes/layout';
import { Button, Flex, Title } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { RoutesDef } from '@notes/utils';
import { usePrefetchNotesTodos } from '@notes/hooks';

export const Route = createFileRoute('/_auth/')({
  component: Home
});

function Home() {
  const { prefetchTodos, prefetchNotes } = usePrefetchNotesTodos();

  return (
    <MainLayout>
      <Title pt="xl" order={2}>
        In this app you can store your:{' '}
      </Title>
      <Flex gap={'lg'} mt="xl" justify={'center'}>
        <Button
          variant="notes-transparent-border"
          size="large"
          onMouseEnter={prefetchTodos}
          component={Link}
          to={RoutesDef.TODOS}
        >
          todos
        </Button>
        <Button
          variant="notes-transparent-border"
          size="large"
          onMouseEnter={prefetchNotes}
          component={Link}
          to={RoutesDef.NOTES}
        >
          notes
        </Button>
      </Flex>
    </MainLayout>
  );
}

// TODO: Add unit test for form
// TODO: Add cypress test for the whole page
// TODO: Add error messages and confirmations
// TODO: add user profile edit
