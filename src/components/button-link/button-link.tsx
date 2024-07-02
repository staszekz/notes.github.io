import { Button } from '@mantine/core';
import classes from './styles.module.css';
import { Link } from '@tanstack/react-router';
import { cx } from 'classix';

export const ButtonLink = ({ children, to, large = false }: Props) => (
  <Button className={cx(classes.button, large && classes.buttonLarge)}>
    <Link to={to}>{children}</Link>
  </Button>
);

type Props = {
  children: React.ReactNode;
  to: string;
  large?: boolean;
};
