import { Box, Button } from '@mantine/core';
import classes from './styles.module.css';
import { Link } from '@tanstack/react-router';
import { RoutesDef } from '@notes/utils';
import { usePrefetchNotesTodos } from '@notes/hooks';

export const NavBarButtonWrapper = () => {
  const { prefetchTodos, prefetchNotes } = usePrefetchNotesTodos();

  return (
    <Box className={classes.buttonWrapper}>
      <Button variant="white" size="small" component={Link} to={RoutesDef.HOME}>
        home
      </Button>
      <Button variant="white" size="small" onMouseEnter={prefetchTodos} component={Link} to={RoutesDef.TODOS}>
        todos
      </Button>
      <Button variant="white" size="small" onMouseEnter={prefetchNotes} component={Link} to={RoutesDef.NOTES}>
        notes
      </Button>
    </Box>
  );
};
