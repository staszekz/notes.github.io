import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'utils/theme';
import { StyledButton } from 'components/Button/Button';
import { StyledInput } from 'components/Todo/TodoInput';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { StyledH1 } from 'components/H1/H1';

const StyledForm = styled(Form)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 25%;
  color: white;
  ${({ theme }) => theme.media.phone} {
    width: 90%;
  }
  ${({ theme }) => theme.media.landscape} {
    width: 70%;
  }
`;

const ChangedStyledButton = styled(StyledButton)`
  align-self: flex-end;
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.dark};
  ${({ theme }) => theme.media.landscape} {
    margin-top: 1rem;
  }
`;

const SignIn = () => {
  return (
    <ThemeProvider theme={theme}>
      <Formik
        initialValues={{ name: '', password: '', email: '' }}
        validationSchema={Yup.object({
          name: Yup.string().max(25, 'Must be 25 characters or less').required('Required'),
          password: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values));
          setSubmitting(false);
          console.log('values', values);
        }}
      >
        {({ values, isSubmitting, handleChange, handleBlur }) => (
          <StyledForm>
            <StyledH1>Please Sign In</StyledH1>
            <label htmlFor="email">Email</label>
            <StyledInput
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <ErrorMessage name="email" />
            <label htmlFor="password">Password</label>
            <StyledInput
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <ErrorMessage name="password" />
            <ChangedStyledButton as="button" type="submit" disabled={isSubmitting}>
              <FontAwesomeIcon icon={faSignInAlt} size="lg" />
            </ChangedStyledButton>
          </StyledForm>
        )}
      </Formik>
    </ThemeProvider>
  );
};

export default SignIn;
