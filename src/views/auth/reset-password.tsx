import { Paper, Flex, rem, Title, Button, TextInput } from '@mantine/core';
import { RoutesDef } from '@notes/utils';
import { IconLogin2, IconMailCheck } from '@tabler/icons-react';
import { useForm } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';
import classes from './style.module.css';
import { useAuthContext } from '@notes/hooks';

export function ResetPassword() {
  const { resetPassword } = useAuthContext();

  const { Field, Subscribe, handleSubmit, state } = useForm({
    defaultValues: { email: '' },
    validatorAdapter: zodValidator(),
    onSubmit: async () => {
      resetPassword(state.values.email);
    }
  });

  return (
    <Paper shadow="sm" p="xl" w="fit-content" bg={'var(--dark-bg-color)'} maw={'600px'} m="40px auto">
      <Flex direction={'column'} align={'center'}>
        <IconMailCheck color={'var(--primary)'} style={{ width: rem(40), height: rem(40) }} />
        <br />
        {state.isSubmitted ? (
          <Title order={3} c={'var(--white)'} mb={'xl'}>
            We have sent you a verification link to provided e-mail. Please click on it to reset your password.
          </Title>
        ) : (
          <form
            onSubmit={e => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit();
            }}
          >
            <Title order={2} c={'var(--white'} mb={'xl'}>
              Please provide your e-mail.
            </Title>
            <Field
              name="email"
              validators={{
                onSubmit: z.string().email('Invalid e-mail').trim(),
                onBlur: z.string().email('Invalid e-mail')
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <TextInput
                    className={classes.textInput}
                    data-autofocus
                    size="md"
                    defaultValue={state.value}
                    onChange={e => handleChange(e.target.value)}
                    onBlur={handleBlur}
                    withAsterisk
                    label="E-mail"
                    placeholder="Enter e-mail address"
                    error={state.meta?.errors[0]}
                  />
                );
              }}
            />
            <Flex justify={'flex-end'} mt={5} align={'center'}>
              <Subscribe
                selector={state => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => {
                  return (
                    <Button
                      size="medium"
                      right={0}
                      type="submit"
                      variant="notes-transparent-border"
                      loading={isSubmitting}
                      disabled={!canSubmit}
                      loaderProps={{ color: 'var(--white)', size: 20 }}
                    >
                      <IconLogin2 stroke={1.5} />
                    </Button>
                  );
                }}
              />
            </Flex>
          </form>
        )}
        <br />
        <Button component={Link} variant="notes-transparent-border" size="md" fz={'md'} to={RoutesDef.SIGNIN}>
          Go to Sign In{' '}
        </Button>
      </Flex>
    </Paper>
  );
}
