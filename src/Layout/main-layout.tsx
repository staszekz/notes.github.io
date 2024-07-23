import { NavBar } from '@notes/components';
import { Box } from '@mantine/core';
import classes from './layout.module.css';

export const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Box className={classes.mainLayout}>{children}</Box>
    </>
  );
};
