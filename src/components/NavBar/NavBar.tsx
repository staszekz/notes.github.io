import React, { useState, useEffect } from 'react';
import { IconLogout } from '@tabler/icons-react';
import { StyledH1, ButtonLink } from '@notes/components';
import ReactTooltip from 'react-tooltip';
import { StyledBar, StyledButtonPlace, StyledButtonIcon } from './styled';
import { app } from 'src/database/database';
import { getAuth, User , getAdditionalUserInfo} from 'firebase/auth';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useNavigate } from 'react-router';

const auth = getAuth(app);

export const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
const navigate = useNavigate()


  const handleSignOutClick = () => {
    auth.signOut();
    navigate('/')
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    // setUser(unsubscribe());
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
        <>
          <StyledH1>hello {user?.providerData?.[0]?.email}</StyledH1>
          {/* <h6 style={{ color: 'white' }}>
              Last logged in: {this.state.user.metadata.lastSignInTime}{' '}
            </h6> */}
        </>
      )}
      <Tooltip id="logout" label="log out">
   <ActionIcon variant="filled" aria-label="logout" onClick={handleSignOutClick}>
   <IconLogout/>
        {/* to="/"
        icon={} 
        onClick={handleSignOutClick}
        data-tip
        data-for="logout" */}
    </ActionIcon>
      </Tooltip>
    </StyledBar>
  );
};
