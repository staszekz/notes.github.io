import { MainLayout } from '@notes/layout';
import { NotesHeader } from '@notes/components';
import classes from './styles.module.css';
import { Box, Button } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { RoutesDef } from '@notes/utils';

export const Home = () => {
  return (
    <MainLayout>
      <Box className={classes.homeWrapper}>
        <NotesHeader component="h1">In this app you can store your: </NotesHeader>
        <div className={classes.buttonWrapper}>
          <Button variant="transparent" size="large" component={Link} to={RoutesDef.TODOS}>
            {/* dodab prefech useQuery na onMouseEnter , albo w route jako before load*/}
            todos
          </Button>
          <Button variant="transparent" size="large" component={Link} to={RoutesDef.NOTES}>
            notes
          </Button>
        </div>
      </Box>
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

// import { queryOptions } from '@tanstack/react-query';

// function getPostQueryOptions(path: string) {
//   return queryOptions({
//     queryKey: ['posts', path],
//     queryFn: () => fetchPost(path),
//     staletime: 5000
//   });
// }

// ...

// function usePost(path) {
//   return useQuery(getPostQueryOptions(path))
// }

// ...

// <a
//   onClick={() => setPath(post.path)}
//   href="#"
//   onMouseEnter={() => {
//     queryClient.prefetchQuery(getPostQueryOptions(post.path))
//   }}
// ></a>
