import { NavBar, StyledButton } from '@notes/components';
import { Box } from '@mantine/core';
import classes from './layout.module.css';

type Props = {
  isModalOpen?: boolean;
  button?: boolean;
};

export const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Box className={classes.mainLayout}>{children}</Box>
    </>
  );
};
