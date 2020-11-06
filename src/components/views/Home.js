import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePageLayout from 'Layout/HomePageLayout';
import GlobalStyles from 'Theme/GlobalStyle';
import ButtonLink from 'components/Button/Button';
import { StyledHomeButtonWrapper } from 'components/Button/HomeButtonWrapper';
import { StyledHomepageWrapper } from 'components/atoms/StyledHomePageWrapper';

const Home = ({ firebase }) => {
  return (
    <>
      <GlobalStyles />
      <HomePageLayout>
        {console.log('fire2', firebase)}
        <StyledHomepageWrapper>
          <h1 style={{ color: 'white' }}>In this app you can store your: </h1>
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

export default Home;
