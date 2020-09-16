import React from 'react';
import { MyButton } from 'components/Button/Button';
import styled from 'styled-components';
import logoutIcon from 'assets/icons/logout.svg';

const Bar = styled.div`
  width: 100vw;
  height: 12vh;
  position: fixed;
  top: 0;
  right: 0%;
  display: flex;

  align-items: center;
  justify-content: space-between;
  font-size: ${({ isBig }) => (isBig ? '3em' : '1.5em')};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  /* background: pink; */
`;

const StyledButtonPlace = styled.div`
  width: 50%;
  height: inherit;
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledLogo = styled.div`
  width: 30%;
  height: 60px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50px;
  text-align: center;
  line-height: 60px;
  /* background: transparent; */
`;

const ButtonIcon = styled.button`
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
      <StyledLogo>Your Note & ToDo </StyledLogo>
      <MyButton> todo</MyButton>
      <MyButton> notes</MyButton>
    </StyledButtonPlace>
    <ButtonIcon icon={logoutIcon} />
  </Bar>
);

export default NavBar;
