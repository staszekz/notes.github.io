import { MainLayout } from '@notes/layout';
import { HomeWrapper, ButtonLink, StyledH1 } from '@notes/components';
import classes from './styles.module.css';

export const Home = () => {
  return (
    <MainLayout>
      <HomeWrapper>
        <StyledH1>In this app you can store your: </StyledH1>
        <div className={classes.wrapper}>
          <ButtonLink large to="/todos">
            todos
          </ButtonLink>
          <ButtonLink large to="/notes">
            notes
          </ButtonLink>
        </div>
      </HomeWrapper>
    </MainLayout>
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
