import { Box, Button } from '@mantine/core';
import classes from './styles.module.css';
import { NotesButton } from '@notes/components';
import { Link } from '@tanstack/react-router';
import { RoutesDef } from '@notes/utils';

export const NavBarButtonWrapper = () => {
  return (
    <Box className={classes.buttonWrapper}>
      <NotesButton variant="white" size="small" component={Link} to={RoutesDef.HOME}>
        home
      </NotesButton>
      <NotesButton variant="white" size="small" component={Link} to={RoutesDef.TODOS}>
        todos
      </NotesButton>
      <NotesButton variant="white" size="small" component={Link} to={RoutesDef.NOTES}>
        notes
      </NotesButton>
    </Box>
  );
};
