import { Box } from '@mantine/core';
import classes from './styles.module.css';
import { BaseButton } from 'src/components/atoms/buttons/base-button';
import { Link } from '@tanstack/react-router';
import { RoutesDef } from '@notes/utils';

export const NavBarButtonWrapper = () => {
  return (
    <Box className={classes.buttonWrapper}>
      <BaseButton<{ to: RoutesDef }>
        variant="white"
        size="small"
        Component={Link}
        componentProps={{ to: RoutesDef.HOME }}
      >
        home
      </BaseButton>
      <BaseButton<{ to: RoutesDef }>
        variant="white"
        size="small"
        Component={Link}
        componentProps={{ to: RoutesDef.TODOS }}
      >
        todos
      </BaseButton>
      <BaseButton<{ to: RoutesDef }>
        variant="white"
        size="small"
        Component={Link}
        componentProps={{ to: RoutesDef.NOTES }}
      >
        notes
      </BaseButton>
    </Box>
  );
};
