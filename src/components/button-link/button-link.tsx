import { Button } from '@mantine/core';

export const ButtonLink = ({ children, to, large = false }: Props) => <Button>{children}</Button>;

type Props = {
  children: React.ReactNode;
  to: string;
  large?: boolean;
};
