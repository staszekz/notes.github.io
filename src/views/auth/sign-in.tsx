import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, Flex, TextInput, Title } from '@mantine/core';
import { z } from 'zod';
import { IconLogin, IconLogin2 } from '@tabler/icons-react';
import { useAuthContext } from 'src/hooks/use-auth-context';
import { Link, useNavigate } from '@tanstack/react-router';
import { RoutesDef } from '@notes/utils';
import classes from './style.module.css';

type SignInValues = {
  email: string;
  password: string;
};
export const SignIn = () => {
  const initialState: SignInValues = {
    email: '',
    password: ''
  };
  const { signIn, setLoadingState } = useAuthContext();
  const navigate = useNavigate();

  const { Field, Subscribe, handleSubmit, state } = useForm({
    defaultValues: initialState,
    validatorAdapter: zodValidator(),
    onSubmit: async () => {
      handleOnSubmit(state.values);
    }
  });

  const handleOnSubmit = async (state: SignInValues) => {
    setLoadingState(true);
    try {
      await signIn(state.email, state.password);
      setLoadingState(false);
      navigate({ to: RoutesDef.HOME });
    } catch (err) {
      alert((err as Error).message);
    }
  };
  return (
    <>
      <form
        className="form-wrapper"
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
                size="xl"
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
                size="xl"
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
        <Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => {
            return (
              <Flex justify={'flex-end'}>
                <Button
                  size="medium"
                  right={0}
                  type="submit"
                  variant="notes-transparent-border"
                  loading={isSubmitting}
                  disabled={!canSubmit}
                >
                  <IconLogin2 stroke={1.5} />
                </Button>
              </Flex>
            );
          }}
        />
        <Button
          component={Link}
          variant="light"
          size="md"
          fz={'md'}
          to={RoutesDef.SIGNUP}
          className={classes.linkWrapper}
          leftSection={<IconLogin />}
        >
          Go back to sign-up page
        </Button>
      </form>
    </>
  );
};
