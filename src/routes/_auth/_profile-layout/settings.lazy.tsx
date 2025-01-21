import { useReducer } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import z from 'zod';
import { Avatar, Text, Group, Paper, Stack, Title, Input, Button } from '@mantine/core';

import { EditIndicator, SelectView } from '@notes/components';
import { viewTypes } from '@notes/types';
import { useUser } from '@notes/hooks';
import { useForm } from '@tanstack/react-form';
import { Timestamp } from 'firebase/firestore';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { modals } from '@mantine/modals';

export const Route = createLazyFileRoute('/_auth/_profile-layout/settings')({
  component: Settings
});

function Settings() {
  const { user } = useUser();

  const [state, dispatch] = useReducer(reducer, {
    name: false,
    email: false,
    password: false,
    defaultView: false,
    avatar: false
  });

  function toggleEdit(field: string) {
    dispatch({ type: 'TOGGLE_EDIT', field });
  }
  const { Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      content: '',
      deadline: null,
      completed: false,
      createdOn: Timestamp.now()
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      modals.closeAll();
    }
  });

  return (
    <Paper shadow="sm" radius="md" p="lg" w={{ base: '100%', md: '50%' }} mx={'auto'} mt={'xl'}>
      <Stack align={'center'} mb={'xl'}>
        <Title size={'h2'} mb={'lg'}>
          Settings:
        </Title>
        <EditIndicator offset={9} onClick={() => toggleEdit('avatar')}>
          <Avatar
            size={'xl'}
            src={
              user?.photoURL || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'
            } // TODO: change with custom user photo and default to some avatar
            radius="50%"
            alt="User avatar"
          />
        </EditIndicator>
        <Stack align="stretch">
          <Group justify={'space-between'}>
            <Text>Name: </Text>
            <EditIndicator disabled={!!state.name} onClick={() => toggleEdit('name')}>
              <Input w={200} disabled={!state.name} value={user?.displayName || 'User'} />
            </EditIndicator>
          </Group>
          <Group justify={'space-between'}>
            <Text>E-mail: </Text>
            <EditIndicator disabled={!!state.email} onClick={() => toggleEdit('email')}>
              <Input w={200} disabled={!state.email} value={user?.email || ''} />
            </EditIndicator>
          </Group>
          <Group justify={'space-between'}>
            <Text>Password: </Text>
            <EditIndicator disabled={!!state.password} onClick={() => toggleEdit('password')}>
              <Input w={200} disabled={!state.password} />
            </EditIndicator>
          </Group>
          <Group justify={'space-between'}>
            <Text>Default View: </Text>
            <EditIndicator disabled={!!state.defaultView} onClick={() => toggleEdit('defaultView')}>
              <SelectView withLabel={false} disabled={!state.defaultView} />
            </EditIndicator>
          </Group>
        </Stack>
        <Group justify="flex-end" w={'100%'}>
          <Subscribe
            selector={state => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                size="sm"
                mt="md"
                type="submit"
                fz="1rem"
                variant="notes-transparent-border"
                disabled={!canSubmit}
              >
                {isSubmitting ? '...' : 'Save'}
              </Button>
            )}
          />
          <Button size="sm" mt="md" fz="1rem" onClick={reset} variant={'notes-danger-border'}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}

export const settingsSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  defaultView: z.nativeEnum(viewTypes),
  avatar: z.string().url()
});

type InitialState = {
  name: boolean;
  email: boolean;
  password: boolean;
  defaultView: boolean;
  avatar: boolean;
};
type Values = z.infer<typeof settingsSchema>;

type Action = { type: 'TOGGLE_EDIT'; field: string };

function reducer(state: InitialState, action: Action) {
  switch (action.type) {
    case 'TOGGLE_EDIT':
      return { ...state, [action.field]: !state[action.field] };
    default:
      return state;
  }
}
