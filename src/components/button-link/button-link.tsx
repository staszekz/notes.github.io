import React from 'react';
import { Link } from 'react-router-dom';
import { StyledButton } from './styled';

export const ButtonLink = ({ children, to, large = false }: Props) => (
  <StyledButton as={Link} large={large} to={to}>
    {children}
  </StyledButton>
);

type Props = {
  children: React.ReactNode;
  to: string;
  large?: boolean;
};
