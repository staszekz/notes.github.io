import { StyledH1 } from '@notes/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { app } from '../../../database/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { ActionIcon, Box, Button, TextInput } from '@mantine/core';
import { z } from 'zod';
import classes from './style.module.css';
import { IconLogin2 } from '@tabler/icons-react';

const addTokensToLocalStorage = (token, refreshToken) => {
  localStorage.setItem('notes-token', token);
  localStorage.setItem('notes-refresh-token', refreshToken);
};

const auth = getAuth(app);

type SignInValues = {
  email: string;
  password: string;
};
export const SignIn = () => {
  const initialState: SignInValues = {
    email: '',
    password: ''
    // redirect: false
  };
  const navigate = useNavigate();
  // const [state, setState] = useState(initialState);
  // const { email, password, redirect } = state;

  const { Field, Subscribe, handleSubmit, state, useStore } = useForm({
    defaultValues: initialState,
    validatorAdapter: zodValidator,
    onSubmit: async () => {
      handleOnSubmit(state.values);
    }
  });

  const handleOnSubmit = async (state: SignInValues) => {
    signInWithEmailAndPassword(auth, state.email, state.password)
      .then(credentials => {
        console.log('🚀 ~ credentials:', credentials);
        addTokensToLocalStorage(
          credentials.user.stsTokenManager.accessToken,
          credentials.user.stsTokenManager.refreshToken
        );
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
        <StyledH1>Please log in</StyledH1>

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
                label="User e-mail"
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
                label="User password"
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
                // c={'var(--primary)'}
                // w={'20%'}
                // radius={'lg'}
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
      </form>
    </>
  );
};
