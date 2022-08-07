import React, { useState, useEffect } from 'react';
import ButtonLink from 'components/Button/Button';
import logoutIcon from 'assets/icons/logout.svg';
import firebase from 'firebase';
import { StyledH1 } from 'components/H1/H1';
import ReactTooltip from 'react-tooltip';
import { StyledBar, StyledButtonPlace, StyledButtonIcon } from './styled';

const NavBar = () => {
  const [user, setUser] = useState(null);

  const handleSignOutClick = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });
    setUser(unsubscribe());
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
        icon={logoutIcon}
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

export default NavBar;
