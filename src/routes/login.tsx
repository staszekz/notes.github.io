import classes from '../styles/auth.module.css';
import { Box, Flex, Space, Title, Image } from '@mantine/core';
import logo from '../assets/logo.svg';
import { createFileRoute } from '@tanstack/react-router';
import { ButtonLink } from '@notes/components';

export const Route = createFileRoute('/login')({
  component: Login
});

function Login() {
  <Box className={classes.wrapper}>
    <Flex justify={'center'} w="500px" m="0 auto" mt="xl">
      <Image w="100%" src={logo} />
    </Flex>
    <Title order={2} c="var(--white)" mt="4rem">
      The best app for todos an taking notes.
    </Title>
    <Space h="xl" />
    <Title order={2} c="var(--white)">
      You are only one step away from using 'Notes & Todos'
    </Title>
    <Box className={classes.loginWrapper}>
      <Title order={2} c="var(--white)">
        Please sign in or sign up to use:
      </Title>
      <Flex gap={'lg'} mt="xl" justify={'center'}>
        <ButtonLink variant="notes-transparent-border" size="xlarge" to={'/signup'}>
          sign up
        </ButtonLink>
        <ButtonLink variant="notes-transparent-border" size="xlarge" to={'/signin'}>
          sign in
        </ButtonLink>
      </Flex>
    </Box>
  </Box>;
}
