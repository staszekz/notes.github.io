import React from 'react';
import { Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'utils/theme';
// import { StyledButton } from 'components/Button/Button';
import { StyledInput } from 'components/Todo/TodoInput';
// import { Formik, Form, ErrorMessage } from 'formik';
import firebase from 'firebase';
// import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { StyledH1 } from 'components/H1/H1';
import { StyledForm, ChangedStyledButton } from 'components/atoms/forFormik';

class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
    redirect: false,
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log('change', this.state.email, this.state.password);
  };
  handleOnSubmit = e => {
    e.preventDefault();
    if (!this.props.isSignUp) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(
          userCredentials =>
            userCredentials.user.updateProfile({
              displayName: this.state.name,
            }),
          // console.log('credentials', userCredentials),
        )
        .then(() => {
          // console.log(this.state.email, this.state.password);
          this.setState({
            redirect: true,
          });
        })
        .catch(err => {
          alert(err.message);
        });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(userData => {
          console.log('dane użytkownika', userData);
          this.setState({
            redirect: true,
          });
        })
        .catch(err => {
          alert(err.message);
        });
    }
  };

  render() {
    const { email, password, name, redirect } = this.state;
    const { isSignUp } = this.props;

    if (redirect) {
      return <Redirect to="/home" />;
    }

    return (
      <ThemeProvider theme={theme}>
        <StyledForm onSubmit={this.handleOnSubmit}>
          <StyledH1>Please {isSignUp ? 'Sign In' : 'Sign Up'}</StyledH1>
          {!isSignUp && (
            <>
              <label htmlFor="name">Name</label>
              <StyledInput
                name="name"
                type="text"
                onChange={this.handleOnChange}
                // onBlur={handleBlur}
                value={name}
              />
            </>
          )}
          <label htmlFor="email">Email</label>
          <StyledInput
            name="email"
            type="email"
            onChange={this.handleOnChange}
            // onBlur={handleBlur}
            value={email}
          />

          <label htmlFor="password">Password</label>
          <StyledInput
            name="password"
            type="password"
            onChange={this.handleOnChange}
            // onBlur={handleBlur}
            value={password}
          />

          <ChangedStyledButton as="button" type="submit">
            <FontAwesomeIcon icon={faSignInAlt} size="lg" />
          </ChangedStyledButton>
        </StyledForm>
      </ThemeProvider>
    );
  }
}

export default SignUp;
