import { useNavigate } from 'react-router-dom';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, TextInput } from '@mantine/core';
import { z } from 'zod';
import classes from './style.module.css';
import { IconLogin2 } from '@tabler/icons-react';
import { Title } from '@notes/components';
import { useAuthContext } from 'src/hooks/use-auth-context';

type SignInValues = {
  email: string;
  password: string;
};
export const SignIn = () => {
  const initialState: SignInValues = {
    email: '',
    password: ''
  };
  const navigate = useNavigate();
  const { signIn } = useAuthContext();

  const { Field, Subscribe, handleSubmit, state, useStore } = useForm({
    defaultValues: initialState,
    validatorAdapter: zodValidator,
    onSubmit: async () => {
      handleOnSubmit(state.values);
    }
  });

  const handleOnSubmit = async (state: SignInValues) => {
    signIn(state.email, state.password)
      .then(() => {
        navigate('/home');
      })
      .catch(err => {
        // TODO: handle error into popup window
        alert(err.message);
      });
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
        <Title pb={16} c={'var(--white'}>
          Please log in
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
              <Button
                className={classes.submitButton}
                loading={isSubmitting}
                variant="outline"
                type="submit"
                disabled={!canSubmit}
              >
                <IconLogin2 stroke={1.5} />
              </Button>
            );
          }}
        />
        <Button bd={'1px solid var(--primary)'} c={'var(--primary)'} variant="outline">
          Go back to sign-in page
        </Button>
      </form>
    </>
  );
};
