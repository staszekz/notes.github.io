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
    <Box className={classes.bar}>
      <NavBarButtonWrapper />
      {user && <NavBarUser user={user} />}
      <NavBarLogoutWrapper handleClick={handleSignOutClick} />
    </Box>
  );
};
