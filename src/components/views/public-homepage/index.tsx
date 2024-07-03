import { StyledH1, HomeWrapper, ButtonLink } from '@notes/components';
import { StyledHeader, StyledWrapper } from './styled';

export const AuthView = () => (
  <>
    <StyledWrapper>
      <StyledHeader> The best app for todos an taking notes</StyledHeader>
      <StyledH1> You are only one step away from using 'Notes & Todos'</StyledH1>
      <HomeWrapper>
        <StyledH1>Please sign in or sign up to use</StyledH1>
        <div>
          <ButtonLink large to={'/signup'}>
            sign up
          </ButtonLink>
          <ButtonLink large to={'/signin'}>
            sign in
          </ButtonLink>
        </div>
      </HomeWrapper>
    </StyledWrapper>
  </>
);
