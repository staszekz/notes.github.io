import classes from './styles.module.css';
import { Box, Button, Flex, Space, Title } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { RoutesDef } from '@notes/utils';

export const AuthView = () => (
  <Box className={classes.wrapper}>
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
        <Button variant="notes-transparent-border" size="xlarge" component={Link} to={RoutesDef.SIGNUP}>
          sign up
        </Button>
        <Button variant="notes-transparent-border" size="xlarge" component={Link} to={RoutesDef.SIGNIN}>
          sign in
        </Button>
      </Flex>
    </Box>
  </Box>
);
