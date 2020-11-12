import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { StyledH1 } from 'components/H1/H1';
import GlobalStyles from 'Theme/GlobalStyle';
import { theme } from 'utils/theme';
import ButtonLink from 'components/Button/Button';
import { StyledHomeButtonWrapper } from 'components/Button/HomeButtonWrapper';
import { StyledHomepageWrapper } from 'components/atoms/StyledHomePageWrapper';

const StyledHeader = styled(StyledH1)`
  margin-top: 3rem;
`;

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
