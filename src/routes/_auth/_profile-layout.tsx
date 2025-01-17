import { Box, Flex } from '@mantine/core';
import { Footer, NavBar } from '@notes/components';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import classes from '../../styles/layout.module.css';

export const Route = createFileRoute('/_auth/_profile-layout')({
  component: () => (
    <Flex direction={'column'} className={classes.appContainer}>
      <NavBar />
      <Box className={classes.layout}>
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  )
});
