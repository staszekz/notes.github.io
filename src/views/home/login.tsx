import { ButtonLink, NotesHeader } from '@notes/components';
import classes from './styles.module.css';
import { Box } from '@mantine/core';

export const AuthView = () => (
  <Box className={classes.wrapper}>
    <NotesHeader component="h1" className={classes.header}>
      The best app for todos an taking notes
    </NotesHeader>
    <NotesHeader component="h1"> You are only one step away from using 'Notes & Todos'</NotesHeader>
    <Box className={classes.homeWrapper}>
      <NotesHeader component="h1">Please sign in or sign up to use</NotesHeader>
      <div className={classes.buttonWrapper}>
        <ButtonLink large to={'/signup'}>
          sign up
        </ButtonLink>
        <ButtonLink large to={'/signin'}>
          sign in
        </ButtonLink>
      </div>
    </Box>
  </Box>
);
