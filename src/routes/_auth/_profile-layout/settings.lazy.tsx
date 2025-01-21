import { createLazyFileRoute } from '@tanstack/react-router';
import { Avatar, Text, Group, Paper, Stack, Title, Input, Select } from '@mantine/core';
import { EditIndicator } from '@notes/components';

export const Route = createLazyFileRoute('/_auth/_profile-layout/settings')({
  component: Settings
});

function Settings() {
  function toggleEdit() {
    console.log('toggleEdit');
  }
  return (
    <Paper shadow="sm" radius="md" p="lg" w={{ base: '100%', md: '50%' }} mx={'auto'} mt={'xl'}>
      <Stack align={'center'} mb={'xl'}>
        <Title size={'h2'} mb={'lg'}>
          Settings:
        </Title>
        <EditIndicator offset={9} onClick={toggleEdit}>
          <Avatar
            size={'xl'}
            src={'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'} // TODO: change with custom user photo and default to some avatar
            radius="50%"
            alt="User avatar"
          />
        </EditIndicator>
        <Group>
          <Text>Name: </Text>
          <EditIndicator onClick={toggleEdit}>
            <Input />
          </EditIndicator>
        </Group>
        <Group>
          <Text>E-mail: </Text>
          <EditIndicator onClick={toggleEdit}>
            <Input />
          </EditIndicator>
        </Group>
        <Group>
          <Text>Password: </Text>
          <EditIndicator onClick={toggleEdit}>
            <Input />
          </EditIndicator>
        </Group>
        <Group>
          <Text>Default Tasks View: </Text>
          <EditIndicator onClick={toggleEdit}>
            <Select />
          </EditIndicator>
        </Group>
      </Stack>
    </Paper>
  );
}
