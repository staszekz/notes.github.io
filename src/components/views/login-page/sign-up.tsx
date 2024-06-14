import { Title } from '@notes/components';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, TextInput } from '@mantine/core';
import { IconLogin2 } from '@tabler/icons-react';
import { z } from 'zod';
import classes from './style.module.css';
import { useAuthContext } from '@notes/hooks';

export const SignUp = () => {
  const initialState = {
    email: '',
    password: '',
    name: '',
    redirect: false
  };

  const { Field, Subscribe, handleSubmit, state } = useForm({
    defaultValues: initialState,
    validatorAdapter: zodValidator,
    onSubmit: async () => {
      handleOnSubmit();
    }
  });
  const navigate = useNavigate();
  const { signUp } = useAuthContext();

  const handleOnSubmit = async () => {
    signUp(state.values.email, state.values.password)
      .then(userCredentials => {
        updateProfile(userCredentials.user, {
          displayName: state.values.name
        });
      })
      .then(() => {
        navigate('/home');
      })
      .catch(err => {
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
          Please sign-up
        </Title>
        <Field
          name="name"
          validators={{
            onSubmit: z.string().trim(),
            onBlur: z.string()
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
          Go to log-in page
        </Button>
      </form>
    </>
  );
};
