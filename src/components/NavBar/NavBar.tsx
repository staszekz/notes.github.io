import { IconLogout } from '@tabler/icons-react';
import { ButtonLink, Title } from '@notes/components';
import { StyledBar, StyledButtonPlace } from './styled';
import { ActionIcon, Stack, Tooltip, Text } from '@mantine/core';
import { useAuthContext } from '@notes/hooks';

export const NavBar = () => {
  // const navigate = useNavigate();
  const { user, signUserOut } = useAuthContext();
  const handleSignOutClick = () => {
    signUserOut();
    // navigate('/');
  };

  return (
    <StyledBar>
      <StyledButtonPlace>
        <ButtonLink to="/home">home</ButtonLink>
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
          <IconLogout stroke={1} />
        </ActionIcon>
      </Tooltip>
    </StyledBar>
  );
};
