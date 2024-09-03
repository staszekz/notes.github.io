import { MainLayout } from '@notes/layout';
import { Button, Flex, Title } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { RoutesDef } from '@notes/utils';

export const Home = () => {
  return (
    <MainLayout>
      <Title pt="xl" order={2}>
        In this app you can store your:{' '}
      </Title>
      <Flex gap={'lg'} mt="xl" justify={'center'}>
        <Button variant="notes-transparent-border" size="large" component={Link} to={RoutesDef.TODOS}>
          {/* dodab prefech useQuery na onMouseEnter , albo w route jako before load*/}
          todos
        </Button>
        <Button variant="notes-transparent-border" size="large" component={Link} to={RoutesDef.NOTES}>
          notes
        </Button>
      </Flex>
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
