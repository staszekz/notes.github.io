import { Box, Button } from '@mantine/core';
import classes from './styles.module.css';
import { Link } from '@tanstack/react-router';
import { usePrefetchNotesTodos } from '@notes/hooks';
import { ButtonLink } from 'src/components/atoms';

export const NavBarButtonWrapper = () => {
  const { prefetchTodos, prefetchNotes } = usePrefetchNotesTodos();

  return (
    <Box className={classes.buttonWrapper}>
      <ButtonLink variant="white" size="small" to={'/'}>
        home
      </ButtonLink>
      <ButtonLink variant="white" size="small" onMouseEnter={prefetchTodos} to={'/todos'}>
        todos
      </ButtonLink>
      <ButtonLink variant="white" size="small" onMouseEnter={prefetchNotes} to={'/notes'}>
        notes
      </ButtonLink>
    </Box>
  );
};
