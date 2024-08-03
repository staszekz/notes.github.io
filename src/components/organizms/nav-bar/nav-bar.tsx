import { NavBarButtonWrapper, NavBarUser } from '@notes/components';
import classes from './styles.module.css';
import { Box, Image } from '@mantine/core';
import logo from '../../../assets/logo.svg';

export const NavBar = () => {
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.logo}><Image w="200px" src={logo} /></Box>
      <Box className={classes.bar}>
        <NavBarButtonWrapper />
        <NavBarUser />
      </Box>
    </Box>
  );
};
