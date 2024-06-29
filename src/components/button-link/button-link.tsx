import { Button } from '@mantine/core';
import { StyledButton } from 'src/components/button-link/styled';

export const ButtonLink = ({ children, to, large = false }: Props) => (
  <StyledButton to={to} large={large}>
    {children}
  </StyledButton>
);

type Props = {
  children: React.ReactNode;
  to: string;
  large?: boolean;
};
