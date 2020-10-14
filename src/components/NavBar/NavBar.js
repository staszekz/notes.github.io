import React from 'react';
import {Link } from 'react-router-dom';
import ButtonLink from 'components/Button/Button';
import styled from 'styled-components';
import logoutIcon from 'assets/icons/logout.svg';
import { theme } from 'utils/theme';


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

// const StyledLogo = styled(ButtonLink)`
//   width: 30%;
//   height: 60px;
//   border: 2px solid ${({ theme }) => theme.colors.primary};
//   color: ${({ theme }) => theme.colors.white};
//   border-radius: 50px;
//   text-align: center;
//   line-height: 60px;
//   background: transparent;

//   /* background: transparent; */
// `;

const ButtonIcon = styled(Link)`
  width: 60px;
  height: 60px;
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
`;

const NavBar = () => (
  <Bar>
    <StyledButtonPlace>
      <ButtonLink to="/">home</ButtonLink>
      <ButtonLink to="/todos">todos</ButtonLink>
      <ButtonLink to="/notes">notes</ButtonLink>
    </StyledButtonPlace>
    <ButtonIcon to="signin" icon={logoutIcon} />
  </Bar>
);

export default NavBar;
