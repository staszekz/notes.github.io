import { IconLogout } from '@tabler/icons-react';
import { ButtonLink, Title } from '@notes/components';
import { StyledBar, StyledButtonPlace } from './styled';
import { ActionIcon, Stack, Tooltip, Text } from '@mantine/core';
import { useAuthContext } from '@notes/hooks';
import { Link } from '@tanstack/react-router';
import { RoutesDef } from '@notes/utils';

export const NavBar = () => {
  const { user, signUserOut } = useAuthContext();
  const handleSignOutClick = () => {
    signUserOut();
  };

  return (
    <StyledBar>
      <StyledButtonPlace>
        <ButtonLink to="/">home</ButtonLink>
        <ButtonLink to="/todos">todos</ButtonLink>
        <ButtonLink to="/notes">notes</ButtonLink>
      </StyledButtonPlace>
      {user && (
        <Stack>
          <Title ta="left" c={'var(--primary)'}>
            hello {user?.providerData?.[0]?.displayName}
          </Title>
          <Text c={'var(--primary)'}>
            Last logged in: <br />
            {user.metadata.lastSignInTime}{' '}
          </Text>
        </Stack>
      )}
      <Tooltip id="logout" label="log out">
        <ActionIcon mr={16} variant="outlined" aria-label="logout" bg={'transparent'} onClick={handleSignOutClick}>
          <Link to={RoutesDef.LOGIN}>
            <IconLogout stroke={1} />
          </Link>
        </ActionIcon>
      </Tooltip>
    </StyledBar>
  );
};
