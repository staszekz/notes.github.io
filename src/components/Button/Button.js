import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 20%;
  padding: 1rem;
  height: 50px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 50px;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  font-weight: 600;
  transition: box-shadow 0.3s ease;

  ${({ theme }) => theme.media.phone} {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSize.xs};
    width: 50px;
  }
  ${({ theme }) => theme.media.landscape} {
    height: 30px;
    font-size: ${({ theme }) => theme.fontSize.s};
  }

  :hover {
    box-shadow: 0 10px 20px -15px ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
  }
  ${({ modal }) =>
    modal &&
    css`
      width: 40%;
    `}
  ${({ homepage }) =>
    homepage &&
    css`
      height: 100px;
      box-shadow: -5px 3px 15px rgba(62, 194, 233, 0.3);
      width: 40%;

      background-color: ${({ theme }) => theme.colors.dark};
      border: 3px solid ${({ theme }) => theme.colors.primary};
      ${({ theme }) => theme.media.phone} {
        background: ${({ theme }) => theme.colors.dark};
        color: ${({ theme }) => theme.colors.primary};
        font-size: ${({ theme }) => theme.fontSize.xs};
        width: 40%;
      }
    `}
`;

const ButtonLink = ({ children, to, homepage }) => (
  <StyledButton homepage={homepage} to={to}>
    {children}
  </StyledButton>
);

export default ButtonLink;
