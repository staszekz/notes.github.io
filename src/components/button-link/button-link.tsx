import React from 'react';
import { Link } from 'react-router-dom';
import { StyledButton } from './styled';

export const ButtonLink = ({ children, to, homepage = false }: Props) => (
  <StyledButton as={Link} homepage={homepage} to={to}>
    {children}
  </StyledButton>
);

type Props = {
  children: React.ReactNode;
  to: string;
  homepage: boolean;
};
