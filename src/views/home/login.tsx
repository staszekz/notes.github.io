import { NotesButton, ButtonLink, NotesHeader } from '@notes/components';
import classes from './styles.module.css';
import { Box } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { RoutesDef } from '@notes/utils';

export const AuthView = () => (
  <Box className={classes.wrapper}>
    <NotesHeader component="h1" className={classes.header}>
      The best app for todos an taking notes
    </NotesHeader>
    <NotesHeader component="h1"> You are only one step away from using 'Notes & Todos'</NotesHeader>
    <Box className={classes.homeWrapper}>
      <NotesHeader component="h1">Please sign in or sign up to use</NotesHeader>
      <div className={classes.buttonWrapper}>
        <NotesButton
          classNames={classes.button}
          variant="transparent"
          size="large"
          component={Link}
          to={RoutesDef.SIGNUP}
        >
          sign up
        </NotesButton>
        <NotesButton
          classNames={classes.button}
          variant="transparent"
          size="large"
          component={Link}
          to={RoutesDef.SIGNIN}
        >
          sign in
        </NotesButton>
      </div>
    </Box>
  </Box>
);
