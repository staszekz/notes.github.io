import { Button } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import styled, { css } from 'styled-components';

type StyledButtonProps = {
  large?: boolean;
  modal?: boolean;
};

export const StyledButton = styled(Link) <StyledButtonProps>`
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
  font-size: 1.5rem;
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
  ${({ large }) =>
    large &&
    css`
      height: 100px;
      width: 40%;

      box-shadow: -5px 3px 15px rgba(62, 194, 233, 0.3);
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

export const StyledHomeButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
  height: 50%;
`;
