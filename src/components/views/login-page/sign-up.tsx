import { Title } from '@notes/components';
// import { useNavigate } from 'react-router-dom';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, TextInput } from '@mantine/core';
import { IconLogin2, IconLogin } from '@tabler/icons-react';
import { z } from 'zod';
import classes from './style.module.css';
import { useAuthContext } from '@notes/hooks';
import { collection, doc, setDoc } from 'firebase/firestore';
import { database } from '@notes/database';
import { CollectionType } from '@notes/types';
import { FirebaseError } from 'firebase/app';

export const SignUp = () => {
  const initialState = {
    email: '',
    password: '',
    password_confirm: '',
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
  // const navigate = useNavigate();
  const { signUp, setLoadingState } = useAuthContext();

  const handleOnSubmit = async () => {
    setLoadingState(true);
    try {
      const { user } = await signUp(state.values.email, state.values.password, state.values.name);
      await setDoc(doc(collection(database, CollectionType.USERS), user.uid), {});
      setLoadingState(false);
      // navigate('/home');
    } catch (error) {
      // navigate('/');
      throw new FirebaseError(error.code, error?.message);
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
                size="xl"
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
        <Button bd={'1px solid var(--primary)'} leftSection={<IconLogin />} c={'var(--primary)'} variant="outline">
          Go to log-in page
        </Button>
      </form>
    </>
  );
};
