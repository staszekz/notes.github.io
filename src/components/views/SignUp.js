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
import { StyledForm, ChangedStyledButton } from 'components/atoms/forFormik';

const SignUp = () => {
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
            <StyledH1>Please Sign Up</StyledH1>
            <label htmlFor="name">Name</label>
            <StyledInput
              name="name"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <ErrorMessage name="name" />
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

export default SignUp;