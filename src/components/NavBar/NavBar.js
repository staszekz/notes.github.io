import React from 'react';
import { Link } from 'react-router-dom';
import ButtonLink from 'components/Button/Button';
import styled from 'styled-components';
import logoutIcon from 'assets/icons/logout.svg';
import firebase from 'firebase';

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
          <ButtonLink to="/home">home</ButtonLink>
          {console.log(this.state.user)}
          <ButtonLink to="/todos">todos</ButtonLink>
          <ButtonLink to="/notes">notes</ButtonLink>
        </StyledButtonPlace>
        {this.state.user && (
          <h2 style={{ color: 'white' }}>welcome {this.state.user.providerData[0].displayName} </h2>
        )}
        <ButtonIcon to="/" icon={logoutIcon} onClick={this.handleSignOutClick} />
      </Bar>
    );
  }
}

export default NavBar;
