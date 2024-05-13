import React, { useState, useEffect } from 'react';
// import LogoutIcon from '../../assets/icons/logout.svg';
import { StyledH1, ButtonLink } from '@notes/components';
import ReactTooltip from 'react-tooltip';
import { StyledBar, StyledButtonPlace, StyledButtonIcon } from './styled';
import { app } from 'src/database/database';
import { getAuth } from 'firebase/auth';

const auth = getAuth(app);

export const NavBar = () => {
  const [user, setUser] = useState(null);

  const handleSignOutClick = () => {
    auth.signOut();
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
          <StyledH1>hello {user.providerData[0].displayName}</StyledH1>
          {/* <h6 style={{ color: 'white' }}>
              Last logged in: {this.state.user.metadata.lastSignInTime}{' '}
            </h6> */}
        </>
      )}
      <StyledButtonIcon
        to="/"
        // icon={LogoutIcon}
        onClick={handleSignOutClick}
        data-tip
        data-for="logout"
      />
      <ReactTooltip id="logout" place="top" effect="solid">
        Sign Out
      </ReactTooltip>
    </StyledBar>
  );
};
