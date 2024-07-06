import { Box } from '@mantine/core';
import classes from './styles.module.css';
import { ButtonLink } from '@notes/components';

export const NavBarButtonWrapper = () => {
  return (
    <Box className={classes.buttonWrapper}>
      <ButtonLink nav to="/">
        home
      </ButtonLink>
      <ButtonLink nav to="/todos">
        todos
      </ButtonLink>
      <ButtonLink nav to="/notes">
        notes
      </ButtonLink>
    </Box>
  );
};
