import { useState, useEffect } from 'react';
import { IconLogout } from '@tabler/icons-react';
import { ButtonLink, Title } from '@notes/components';
import { StyledBar, StyledButtonPlace, StyledButtonIcon } from './styled';
import { app } from '@notes/database';
import { getAuth, User, getAdditionalUserInfo } from 'firebase/auth';
import { ActionIcon, Stack, Tooltip, Text } from '@mantine/core';
import { useNavigate } from 'react-router';

const auth = getAuth(app);

export const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    auth.signOut();
    navigate('/');
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

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
