import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePageLayout from 'Layout/HomePageLayout';
import styled, { css } from 'styled-components';
import GlobalStyles from 'Theme/GlobalStyle';
import ButtonLink from 'components/Button/Button';

const StyledWrapper = styled.div`
  /* border: 3px solid ${({theme})  => theme.colors.primary}; */
   position: absolute;
   top: 50%;
   left: 50%;
   height: 50%;
   width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 2rem;
  transform: translate(-50%, -50%);
  background-color: ${({theme})  => theme.colors.dark};
  transition: transform 0.25s ease-in-out;
  ${({ theme }) => theme.media.phone} {
    width: 90%;
  }
  ${({ theme }) => theme.media.landscape} {
    width: 80%;
  }
`;

const StyledButtonWrapper = styled.div`
 display: flex;
 justify-content: space-evenly;
 align-items: center;
 width: 90%;
 height: 50%;
`;


const Home = () => {
  return (
    <>
      <GlobalStyles />
      <HomePageLayout>
        <StyledWrapper>
          <h1 style={{color: 'white'}}>In this app you can store your: </h1>
          <StyledButtonWrapper>
             <ButtonLink homePage='true' to='/todos'>todos</ButtonLink>
             <ButtonLink homePage='true' to='/notes'>notes</ButtonLink>
             </StyledButtonWrapper>
        </StyledWrapper>
       </HomePageLayout>

    </>
  );
};

export default Home;
