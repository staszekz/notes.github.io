import { createLazyFileRoute } from '@tanstack/react-router';

import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, Flex, TextInput, Title } from '@mantine/core';
import { IconLogin2, IconLogin } from '@tabler/icons-react';
import { z } from 'zod';
import classes from '../styles/auth.module.css';
import { useAuthContext } from '@notes/hooks';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { ButtonLink } from '@notes/components';

export const Route = createLazyFileRoute('/signup')({
  component: SignUp
});

function SignUp() {
  const initialState = {
    email: '',
    password: '',
    password_confirm: '',
    name: '',
    redirect: false
  };

  const { Field, Subscribe, handleSubmit, state } = useForm({
    defaultValues: initialState,
    validatorAdapter: zodValidator(),
    onSubmit: async () => {
      handleOnSubmit();
    }
  });
  const navigate = useNavigate();
  const { signUp } = useAuthContext();
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async () => {
    setLoading(true);
    try {
      await signUp(state.values.email, state.values.password, state.values.name);
      navigate({ to: '/verify-email' });
      setLoading(false);
    } catch (error) {
      if ((error as Error).message === 'auth/email-already-in-use') {
        setEmailError('E-mail already in use');
      }
      setLoading(false);
      throw new Error((error as Error).message);
    }
  };

  return (
    <form
      className={classes.formWrapper}
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
    >
      <Title pb={16} mt="xl" order={2} c={'var(--white'}>
        Please sign-up:
      </Title>
      <Field
        name="name"
        validators={{
          onSubmit: z.string().trim().min(1, 'Field is required'),
          onBlur: z.string().trim().min(1, 'Field is required')
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
              label="Name"
              placeholder="How should we call you "
              error={state.meta?.errors[0]}
            />
          );
        }}
      />
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
              error={state.meta?.errors[0] || emailError}
            />
          );
        }}
      />
      <Field
        name="password"
        validators={{
          onSubmit: z.string().trim().min(8, 'Password must be at least 8 characters')
        }}
        children={({ state, handleChange, handleBlur }) => {
          return (
            <TextInput
              className={classes.textInput}
              data-autofocus
              size="md"
              type="password"
              defaultValue={state.value}
              onChange={e => handleChange(e.target.value)}
              onBlur={handleBlur}
              withAsterisk
              label="Password"
              placeholder="Enter password"
              error={state.meta?.errors[0]}
            />
          );
        }}
      />
      <Field
        name="password_confirm"
        validators={{
          onChangeListenTo: ['password'],
          onChange: ({ value, fieldApi }) => {
            if (value !== fieldApi.form.getFieldValue('password')) {
              return 'Passwords do not match';
            }
            return undefined;
          }
        }}
        children={({ state, handleChange, handleBlur }) => {
          return (
            <TextInput
              className={classes.textInput}
              data-autofocus
              size="md"
              type="password"
              onChange={e => handleChange(e.target.value)}
              onBlur={handleBlur}
              withAsterisk
              label="Re-Type Password"
              placeholder="Enter password again"
              error={state.meta?.errors[0]}
            />
          );
        }}
      />
      <Subscribe
        selector={state => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => {
          return (
            <Flex justify={'flex-end'}>
              <Button
                loading={isSubmitting || loading}
                variant="notes-transparent-border"
                size="medium"
                right={0}
                type="submit"
                disabled={!canSubmit}
                loaderProps={{ color: 'var(--white)', size: 20 }}
              >
                <IconLogin2 stroke={1.5} />
              </Button>
            </Flex>
          );
        }}
      />
      <ButtonLink
        variant="light"
        size="md"
        fz={'md'}
        to={'/signin'}
        className={classes.linkWrapper}
        leftSection={<IconLogin />}
      >
        Go back to sign-in page
      </ButtonLink>
    </form>
  );
}
