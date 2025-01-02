import { Box, Flex, LoadingOverlay } from '@mantine/core';
import { Suspense } from 'react';
import { Footer, NavBar } from '@notes/components';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import classes from '../../styles/layout.module.css';
import { Spinner } from 'src/components/atoms/spinner/spinner';

export const Route = createFileRoute('/_auth/_main-layout')({
  component: () => {
    return (
      <Flex direction={'column'} className={classes.appContainer}>
        <NavBar />
        <Box className={classes.layout} component="main">
          <Suspense
            fallback={
              <LoadingOverlay
                overlayProps={{ color: 'var(--dark-bg-color)' }}
                loaderProps={{ children: <Spinner /> }}
                visible
              />
            }
          >
            <Outlet />
          </Suspense>
        </Box>
        <Footer />
      </Flex>
    );
  }
});
