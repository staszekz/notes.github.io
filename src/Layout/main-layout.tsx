import { NavBar } from '@notes/components';
import { Box, LoadingOverlay } from '@mantine/core';
import classes from './layout.module.css';
import { useAuthContext } from 'src/hooks/use-auth-context';

export const MainLayout = ({ children }) => {
  const { loading } = useAuthContext();

  return loading ? (
    <LoadingOverlay
      visible={loading}
      overlayProps={{ backgroundOpacity: 0 }}
      loaderProps={{ color: 'var(--primary)', type: 'bars' }}
    />
  ) : (
    <>
      <NavBar />
      <Box className={classes.mainLayout}>{children}</Box>
    </>
  );
};
