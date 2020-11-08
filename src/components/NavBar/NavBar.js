import React from 'react';
import { Link } from 'react-router-dom';
import ButtonLink from 'components/Button/Button';
import styled from 'styled-components';
import logoutIcon from 'assets/icons/logout.svg';
import firebase from 'firebase';
import { StyledH1 } from 'components/H1/H1';
import ReactTooltip from 'react-tooltip';

const Bar = styled.div`
  width: 100%;
  height: 12vh;
  position: fixed;
  top: 0;
  right: 0%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ isBig }) => (isBig ? '3em' : '1.5em')};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.dark};
  z-index: 2;
`;

const StyledButtonPlace = styled.div`
  width: 50%;
  height: inherit;
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonIcon = styled(Link)`
  width: 50px;
  height: 50px;
  border-radius: 20px;
  margin-right: 1%;
  background-image: url(${({ icon }) => icon});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: 50% 50%;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: white;
  background-color: ${({ active }) => (active ? 'white' : 'transparent')};
  &.active {
    background-color: white;
  }
  ${({ theme }) => theme.media.landscape} {
    width: 30px;
    height: 30px;
  }
`;

class NavBar extends React.Component {
  state = {
    user: null,
  };

  handleSignOutClick = () => {
    firebase.auth().signOut();
  };

  componentDidMount() {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user,
      });
    });
    this.setState({
      unsubscribe,
    });
  }

  componentWillUnmount() {
    this.state.unsubscribe();
  }

  render() {
    return (
      <Bar>
        <StyledButtonPlace>
          {this.state.user && console.log('user navbar', this.state.user)}
          <ButtonLink to="/home">home</ButtonLink>
          <ButtonLink to="/todos">todos</ButtonLink>
          <ButtonLink to="/notes">notes</ButtonLink>
        </StyledButtonPlace>
        {this.state.user && (
          <>
            <StyledH1>hello {this.state.user.providerData[0].displayName}</StyledH1>
            {/* <h6 style={{ color: 'white' }}>
              Last logged in: {this.state.user.metadata.lastSignInTime}{' '}
            </h6> */}
          </>
        )}
        <ButtonIcon
          to="/"
          icon={logoutIcon}
          onClick={this.handleSignOutClick}
          data-tip
          data-for="logout"
        />
        <ReactTooltip id="logout" place="top" effect="solid">
          Sign Out
        </ReactTooltip>
      </Bar>
    );
  }
}

export default NavBar;
