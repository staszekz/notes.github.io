import { NavBarButtonWrapper, NavBarLogoutWrapper, NavBarUser } from '@notes/components';
import { useAuthContext } from '@notes/hooks';
import classes from './styles.module.css';
import { Box } from '@mantine/core';

export const NavBar = () => {
  const { user, signUserOut } = useAuthContext();
  const handleSignOutClick = () => {
    signUserOut();
  };

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.logo}>XXX_LOGO_XXX</Box>
      <Box className={classes.bar}>
        <NavBarButtonWrapper />
        {user && <NavBarUser user={user} />}
        <NavBarLogoutWrapper handleClick={handleSignOutClick} />
      </Box>
    </Box>
  );
};
