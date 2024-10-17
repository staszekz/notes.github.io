import { Box, LoadingOverlay } from '@mantine/core';
import { Footer, NavBar } from '@notes/components';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import classes from '../../styles/layout.module.css';
import { Suspense } from 'react';
import { Spinner } from 'app/components/atoms/spinner/spinner';

export const Route = createFileRoute('/_auth/_main-layout')({
  component: () => {
    return (
      <Box className={classes.appContainer}>
        <NavBar />
        <Box className={classes.layout} pos={'relative'}>
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
      </Box>
    );
  }
});
