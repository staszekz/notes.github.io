import { DonutChart } from '@mantine/charts';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useCounts } from '../../../hooks/counts/use-counts';
import { Avatar, Flex, Group, Paper, Skeleton, Stack, Text, Title } from '@mantine/core';
import { todosQueries } from '@notes/rq';
import { useQuery } from '@tanstack/react-query';

export const Route = createLazyFileRoute('/_auth/_profile-layout/profile')({
  component: Profile
});

function Profile() {
  const { todosCount, notesCount, todosIsPending, notesIsPending } = useCounts();
  const { data } = useQuery(todosQueries.allTodos());
  const completedTodos = data?.filter(todo => todo.completed).length || 10;

  return (
    <Paper shadow="sm" radius="md" p="lg" w={{ base: '100%', md: '50%' }} mx={'auto'} mt={'xl'}>
      <Stack align={'center'} mb={'xl'}>
        <Title size={'h2'}>Profile:</Title>
        <Avatar
          size={'xl'}
          src={'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'} // TODO: change with custom user photo and default to some avatar
          radius="50%"
          alt="User avatar"
        />
      </Stack>
      <Group justify={'space-around'}>
        <Stack align={'center'}>
          {todosIsPending ? (
            <Skeleton height={100} circle mb="xl" />
          ) : (
            <DonutChart
              chartLabel={`${completedTodos} / ${todosCount}`}
              data={[
                { name: 'Completed', value: completedTodos, color: 'var(--dark-bg-color)' },
                { name: 'Total number', value: todosCount, color: 'var(--primary)' }
              ]}
              size={100}
            />
          )}
          <Text>Number of your todos &nbsp;</Text>
        </Stack>
        <Stack align={'center'}>
          {notesIsPending ? (
            <Skeleton height={100} circle mb="xl" />
          ) : (
            <DonutChart
              chartLabel={notesCount}
              strokeWidth={0}
              data={[{ name: 'notes', value: notesCount, color: 'var(--dark-bg-color)' }]}
              size={100}
            />
          )}
          <Text>Number of your notes: &nbsp;</Text>
        </Stack>
      </Group>
    </Paper>
  );
}
