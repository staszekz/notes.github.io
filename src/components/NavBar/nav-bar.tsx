import { IconLogout } from '@tabler/icons-react';
import { ButtonLink, Title } from '@notes/components';
import { ActionIcon, Stack, Tooltip, Text } from '@mantine/core';
import { useAuthContext } from '@notes/hooks';
import { Link } from '@tanstack/react-router';
import { RoutesDef } from '@notes/utils';
import { Bar, ButtonWrapper } from './atoms';
import classes from './styles.module.css';

export const NavBar = () => {
  const { user, signUserOut } = useAuthContext();
  const handleSignOutClick = () => {
    signUserOut();
  };

  return (
    <Bar>
      <ButtonWrapper>
        <ButtonLink nav to="/">
          home
        </ButtonLink>
        <ButtonLink nav to="/todos">
          todos
        </ButtonLink>
        <ButtonLink nav to="/notes">
          notes
        </ButtonLink>
      </ButtonWrapper>
      {user && (
        <Stack>
          <Title ta="left" c={'var(--primary)'}>
            hello {user?.providerData?.[0]?.displayName}
          </Title>
          <Text c={'var(--primary)'} mt={-10}>
            Nice to see you again!
            {/* Last logged in: <br /> */}
            {/* {user.metadata.lastSignInTime}{' '} */}
          </Text>
        </Stack>
      )}
      <Tooltip id="logout" label="log out">
        <Link to={RoutesDef.LOGIN} className={classes.logoutWrapper}>
          <ActionIcon mr={16} variant="outlined" aria-label="logout" bg={'transparent'} onClick={handleSignOutClick}>
            <IconLogout stroke={1} />
          </ActionIcon>
        </Link>
      </Tooltip>
    </Bar>
  );
};
