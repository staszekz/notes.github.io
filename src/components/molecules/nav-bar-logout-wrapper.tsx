import { Box } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { RoutesDef } from '@notes/utils';
import classes from './styles.module.css';
import { Link } from '@tanstack/react-router';

export const NavBarLogoutWrapper = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <Box className={classes.buttonIconWrapper}>
      <Tooltip id="logout" label="log out">
        <Link to={RoutesDef.LOGIN}>
          <ActionIcon mr={16} variant="outlined" aria-label="logout" bg={'transparent'} onClick={handleClick}>
            <IconLogout stroke={1} />
          </ActionIcon>
        </Link>
      </Tooltip>
    </Box>
  );
};
