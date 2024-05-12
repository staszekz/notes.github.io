import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomePageLayout } from '@notes/layout';
import { StyledHomeButtonWrapper, StyledHomepageWrapper, ButtonLink } from '@notes/components';
import { StyledH1 } from '../../H1/H1';
import { GlobalStyle } from '@notes/theme';

export const Home = ({}) => {
  return (
    <>
      <GlobalStyle />
      <HomePageLayout>
        <StyledHomepageWrapper>
          <StyledH1>In this app you can store your: </StyledH1>
          <StyledHomeButtonWrapper>
            <ButtonLink homepage="true" to="/todos">
              todos
            </ButtonLink>
            <ButtonLink homepage="true" to="/notes">
              notes
            </ButtonLink>
          </StyledHomeButtonWrapper>
        </StyledHomepageWrapper>
      </HomePageLayout>
    </>
  );
};

// TODO: Add unit test for form
// TODO: Add cypress test for the whole page
// TODO: Add error messages and confirmations
// TODO: change withCOntext int hooks useCntext
// TODO: zabezpiecznenie przed niezalogowanym uzyciem
// TODO: add user profile edit
// TODO: add user stored in cookies
// TODO: Add reactQuery (or SWR) to fetching and sotring data ??
// TODO: Finally add typescrip to the whole project.
