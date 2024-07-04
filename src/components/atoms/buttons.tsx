import { Box, Button } from '@mantine/core';
import classes from './styles.module.css';
import { Link } from '@tanstack/react-router';
import { cx } from 'classix';

export const ButtonLink = ({ children, to, large = false, nav }: Props) => (
  <Link className={cx('base-button', nav && 'white-button', large && classes.buttonLarge)} to={to}>
    {children}
  </Link>
);

export const CustomButton = ({ children, to, large = false }: Props) => (
  <Button className={cx('base-button', large && classes.buttonLarge)}>{children}</Button>
);

export const ButtonWrapper = ({ children }) => {
  return <Box className={classes.buttonWrapper}>{children}</Box>;
};

type Props = {
  children: React.ReactNode;
  to: string;
  large?: boolean;
  nav?: boolean;
};
