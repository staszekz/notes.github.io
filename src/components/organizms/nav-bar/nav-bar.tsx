import { NavBarButtonWrapper, NavBarUser } from '@notes/components';
import classes from './styles.module.css';
import { Box } from '@mantine/core';

export const NavBar = () => {
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.logo}>XXX_LOGO_XXX</Box>
      <Box className={classes.bar}>
        <NavBarButtonWrapper />
        <NavBarUser />
      </Box>
    </Box>
  );
};
