import { useReducer } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import z from 'zod';
import { Avatar, Text, Group, Paper, Stack, Title, Input, Button } from '@mantine/core';

import { EditIndicator, openResetModal, SelectView } from '@notes/components';
import { useUser } from '@notes/hooks';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { SettingsAction, SettingsInitialState, SettingsValues } from '@notes/types';

export const Route = createLazyFileRoute('/_auth/_profile-layout/settings')({
  component: Settings
});

function Settings() {
  const { user, updateUserData } = useUser();
  const [disableState, dispatch] = useReducer(reducer, {
    name: false,
    email: false,
    avatar: false
  });

  function toggleEdit(field: string) {
    dispatch({ type: 'TOGGLE_EDIT', field });
  }
  const { Field, Subscribe, handleSubmit, reset, state } = useForm({
    defaultValues: {
      name: user?.displayName || 'Anonymous User',
      email: user?.email || '',
      avatar: user?.photoURL || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'
    } as SettingsValues,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      console.log(value);
      await updateUserData(value);
    }
  });

  return (
    <Paper shadow="sm" radius="md" p="lg" w={{ base: '100%', md: '50%' }} mx={'auto'} mt={'xl'}>
      <form
        className="form-wrapper"
        onSubmit={async e => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
        }}
      >
        <Stack align={'center'} mb={'xl'}>
          <Title size={'h2'} mb={'lg'}>
            Settings:
          </Title>
          <Field
            name="avatar"
            validators={{ onSubmit: z.string().url() }}
            children={() => (
              <EditIndicator offset={9} onClick={() => toggleEdit('avatar')}>
                {/*TODO: add modal when edit cliked and there should be validation and input, chyba musi tam być nowy*/}
                {/*form? Sprawdzić czy zadziała ten czy ma byćnowy*/}
                <Avatar
                  size={'xl'}
                  src={
                    user?.photoURL ||
                    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'
                  } // TODO: change with custom user photo and default to some avatar
                  radius="50%"
                  alt="User avatar"
                />
              </EditIndicator>
            )}
          />
          <Stack align="stretch">
            <Group justify={'space-between'}>
              <Text>Name: </Text>
              <Field
                name={'name'}
                validators={{ onChange: z.string() }}
                children={({ state, handleChange, handleBlur }) => {
                  return (
                    <EditIndicator disabled={!!disableState.name} onClick={() => toggleEdit('name')}>
                      <Input
                        w={200}
                        disabled={!disableState.name}
                        onChange={e => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        value={state.value}
                      />
                    </EditIndicator>
                  );
                }}
              />
            </Group>
            <Group justify={'space-between'}>
              <Text>E-mail: </Text>
              <Field
                name={'email'}
                validators={{ onChange: z.string().email() }}
                children={({ state, handleChange, handleBlur }) => (
                  <EditIndicator disabled={!!disableState.email} onClick={() => toggleEdit('email')}>
                    <Input
                      w={200}
                      onChange={e => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      disabled={!disableState.email}
                      value={state.value}
                    />
                  </EditIndicator>
                )}
              />
            </Group>

            <Group justify={'space-between'}>
              <Text>Default View: </Text>
              <SelectView withLabel={false} />
            </Group>
            <Group justify={'space-between'}>
              <Text>Password: </Text>
              <Button onClick={openResetModal} variant={'notes-transparent-border'} size={'small'}>
                Reset
              </Button>
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
      </form>
    </Paper>
  );
}

function reducer(state: SettingsInitialState, action: SettingsAction) {
  switch (action.type) {
    case 'TOGGLE_EDIT':
      return { ...state, [action.field]: !state[action.field] };
    default:
      return state;
  }
}
