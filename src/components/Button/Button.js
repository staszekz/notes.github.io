import React from 'react';
import styled from 'styled-components';
import { NavLink, Link, useRouteMatch } from 'react-router-dom';

const StyledButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 20%;
  padding: 1rem;
  height: 60px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1em;
  font-weight: 600;
  transition: box-shadow 0.3s ease;

  ${({ theme }) => theme.media.desktop} {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
  }

  :hover {
    box-shadow: 0 10px 20px -15px red;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
  }
`;

const Button = ({ children, to }) => <StyledButton to={to}>{children}</StyledButton>;
export default Button;
