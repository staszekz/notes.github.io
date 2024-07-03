import { Button } from '@mantine/core';
import classes from './styles.module.css';
import { Link } from '@tanstack/react-router';
import { cx } from 'classix';

export const ButtonLink = ({ children, to, large = false }: Props) => (
  <Link className={cx('base-button', large && classes.buttonLarge)} to={to}>
    {children}
  </Link>
);

export const CustomButton = ({ children, to, large = false }: Props) => (
  <Button className={cx('base-button', large && classes.buttonLarge)}>{children}</Button>
);

type Props = {
  children: React.ReactNode;
  to: string;
  large?: boolean;
};
