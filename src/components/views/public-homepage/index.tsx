import React from 'react';
import { StyledH1, StyledHomeButtonWrapper, StyledHomepageWrapper, ButtonLink } from '@notes/components';
import { StyledHeader, StyledWrapper } from './styled';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Outlet } from '@tanstack/react-router';

export const PublicHomapage = () => (
  <>
    <StyledWrapper>
      <StyledHeader> The best app for todos an taking notes</StyledHeader>
      <StyledH1> You are only one step away from using 'Notes & Todos'</StyledH1>
      <StyledHomepageWrapper>
        <StyledH1>Please sign in or sign up to use</StyledH1>
        <StyledHomeButtonWrapper>
          <ButtonLink large to={'/signup'}>
            sign up
          </ButtonLink>
          <ButtonLink large to={'/signin'}>
            sign in
          </ButtonLink>
        </StyledHomeButtonWrapper>
      </StyledHomepageWrapper>
    </StyledWrapper>
  </>
);
