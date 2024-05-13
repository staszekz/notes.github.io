import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  StyledH1,
  StyledHomeButtonWrapper,
  StyledHomepageWrapper,
  ButtonLink,
} from '@notes/components';
import { StyledHeader } from './styled';
import { GlobalStyle, theme } from '@notes/theme';

export const PublicHomepage = () => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <StyledHeader> The best app for todos an taking notes</StyledHeader>
      <StyledH1> You are only one step away from using 'Notes & Todos'</StyledH1>
      <StyledHomepageWrapper>
        <StyledH1>Please sign in or sign up to use</StyledH1>
        <StyledHomeButtonWrapper>
          <ButtonLink homepage="true" to="/signup">
            sign up
          </ButtonLink>
          <ButtonLink homepage="true" to="/signin">
            sign in
          </ButtonLink>
        </StyledHomeButtonWrapper>
      </StyledHomepageWrapper>
    </ThemeProvider>
  </>
);
