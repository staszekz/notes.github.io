import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledInput ,StyledH1,StyledForm, ChangedStyledButton} from '@notes/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { app } from '../../../database/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { theme } from '@notes/theme';

const auth = getAuth(app);
console.log('🚀 ~ auth:', auth);

export const SignUp = ({ isSignUp }) => {
  const initialState = {
    email: '',
    password: '',
    name: '',
    redirect: false,
  };
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const { email, password, name, redirect } = state;

  const handleOnChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    if (!isSignUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials =>
          userCredentials.user.updateProfile({
            displayName: name,
          }),
        )
        .then(() => {
          navigate('/home');
        })
        .catch(err => {
          alert(err.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/home');
        })
        .catch(err => {
          // TODO: handle error into popup window
          alert(err.message);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledForm onSubmit={handleOnSubmit}>
        <StyledH1>Please {isSignUp ? 'Sign In' : 'Sign Up'}</StyledH1>
        {!isSignUp && (
          <>
            <label htmlFor="name">Name</label>
            <StyledInput
              name="name"
              type="text"
              onChange={handleOnChange}
              // onBlur={handleBlur}
              value={name}
            />
          </>
        )}
        <label htmlFor="email">Email</label>
        <StyledInput
          name="email"
          type="email"
          onChange={handleOnChange}
          // onBlur={handleBlur}
          value={email}
        />

        <label htmlFor="password">Password</label>
        <StyledInput
          name="password"
          type="password"
          onChange={handleOnChange}
          // onBlur={handleBlur}
          value={password}
        />

        <ChangedStyledButton as="button" type="submit">
          <FontAwesomeIcon icon={faSignInAlt} size="lg" />
        </ChangedStyledButton>
      </StyledForm>
    </ThemeProvider>
  );
};