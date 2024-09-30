import { createLazyFileRoute } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, Checkbox, Flex, TextInput, Title, Text } from '@mantine/core';
import { z } from 'zod';
import { IconLogin, IconLogin2 } from '@tabler/icons-react';
import { useAuthContext } from 'src/hooks/use-auth-context';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { sleep } from '@notes/utils';
import { useState } from 'react';
import classes from '../styles/auth.module.css';
import { ButtonLink } from '@notes/components';

export const Route = createLazyFileRoute('/signin')({
  component: SignIn
});

type SignInValues = {
  email: string;
  password: string;
};

function SignIn() {
  const initialState: SignInValues = {
    email: '',
    password: ''
  };
  const { signIn, setRememberMe } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { Field, Subscribe, handleSubmit, state } = useForm({
    defaultValues: initialState,
    validatorAdapter: zodValidator(),
    onSubmit: async () => {
      handleOnSubmit(state.values);
    }
  });
  const router = useRouter();
  const handleOnSubmit = async (state: SignInValues) => {
    setLoading(true);
    try {
      await signIn(state.email, state.password);
      await router.invalidate();
      // need to be here to wait for context to be updated -> do not remove
      // https://github.com/TanStack/router/issues/1604
      await sleep(1);
      setLoading(false);
      navigate({ to: '/' });
    } catch (err) {
      setLoading(false);
      alert((err as Error).message);
    }
  };

  return (
    <>
      <form
        className={classes.formWrapper}
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <Title pb={16} mt="xl" order={2} c={'var(--white'}>
          Please log in:
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
        <Flex justify={'space-between'} align={'center'}>
          <Checkbox
            ml="sm"
            label={<Text c="var(--primary)">Remember me</Text>}
            color="var(--primary)"
            variant="outline"
            onChange={e => setRememberMe(e.target.checked)}
          />
          <Subscribe
            selector={state => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => {
              return (
                <Button
                  size="medium"
                  right={0}
                  type="submit"
                  variant="notes-transparent-border"
                  loading={isSubmitting || loading}
                  disabled={!canSubmit}
                  loaderProps={{ color: 'var(--white)', size: 20 }}
                >
                  <IconLogin2 stroke={1.5} />
                </Button>
              );
            }}
          />
        </Flex>
        <ButtonLink
          variant="light"
          size="md"
          fz={'md'}
          to={'/signup'}
          className={classes.linkWrapper}
          leftSection={<IconLogin />}
        >
          Go back to sign-up page
        </ButtonLink>
        <Flex justify={'center'}>
          <ButtonLink size="xs" fz={'md'} variant="transparent" to={'/reset-password'}>
            Forgot password?
          </ButtonLink>
        </Flex>
      </form>
    </>
  );
}
