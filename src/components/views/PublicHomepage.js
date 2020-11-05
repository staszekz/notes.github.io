import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { StyledH1, StyledH2 } from 'components/H1/H1';
import GlobalStyles from 'Theme/GlobalStyle';
import { theme } from 'utils/theme';

const PublicHomepage = () => (
  <>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <StyledH1> The best app for todos an taking notes</StyledH1>
      <StyledH2>please log in or sign up to use</StyledH2>
    </ThemeProvider>
  </>
);

export default PublicHomepage;
