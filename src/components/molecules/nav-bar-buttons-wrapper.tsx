import { Box, Button } from '@mantine/core';
import classes from './styles.module.css';
import { Link } from '@tanstack/react-router';
import { RoutesDef } from '@notes/utils';

export const NavBarButtonWrapper = () => {
  return (
    <Box className={classes.buttonWrapper}>
      <Button variant="white" size="small" component={Link} to={RoutesDef.HOME}>
        home
      </Button>
      <Button variant="white" size="small" component={Link} to={RoutesDef.TODOS}>
        todos
      </Button>
      <Button variant="white" size="small" component={Link} to={RoutesDef.NOTES}>
        notes
      </Button>
    </Box>
  );
};
