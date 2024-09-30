import { NavBarButtonWrapper, NavBarUser } from '@notes/components';
import classes from './styles.module.css';
import { Box, Image } from '@mantine/core';
import logo from '../../../assets/logo.svg';
import { Link } from '@tanstack/react-router';

export const NavBarProfile = () => {
  return (
    <Box className={classes.wrapper}>
      <Link className={classes.logo} to={'/'}>
        <Image w="200px" src={logo} />
      </Link>
      <Box className={classes.bar}></Box>
    </Box>
  );
};
