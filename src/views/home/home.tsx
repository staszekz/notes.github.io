import { MainLayout } from '@notes/layout';
import classes from './styles.module.css';
import { Box, Button, Flex, Title } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { RoutesDef } from '@notes/utils';
import { useEffect } from 'react';

export const Home = () => {
  const url = 'https://ciphersprint.pulley.com/staszek.zajaczkowski@gmail.com';
  async function getData() {
    try {
      const response = await fetch(url);
      console.log(response);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);
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
