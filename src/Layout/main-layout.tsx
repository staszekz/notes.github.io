import { Footer, NavBar } from '@notes/components';
import { Box } from '@mantine/core';
import classes from './layout.module.css';

export const MainLayout = ({ children }) => {
  return (
    <Box className={classes.appContainer}>
      <NavBar />
      <Box className={classes.mainLayout}>{children}</Box>
      <Footer />
    </Box>
  );
};
