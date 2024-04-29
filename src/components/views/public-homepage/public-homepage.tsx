import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'Theme/GlobalStyle';
import { theme } from 'utils/theme';
import ButtonLink from 'components/Button/Button';
import { StyledHomepageWrapper } from 'components/atoms/StyledHomePageWrapper';
import { StyledHomeButtonWrapper } from 'components/Button/styled';
import { StyledH1 } from 'components/H1/H1';
import { StyledHeader } from './styled';

const PublicHomepage = () => (
  <>
    <GlobalStyles />
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

export default PublicHomepage;
