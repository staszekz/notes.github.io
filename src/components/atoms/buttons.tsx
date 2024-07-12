import { Box, Button } from '@mantine/core';
import classes from './styles.module.css';
import { Link } from '@tanstack/react-router';
import { cx } from 'classix';

export const ButtonLink = ({ children, to, large = false, nav, classNames }: LinkProps) => (
  <Link className={cx('base-button', nav && 'white-button', large && classes.buttonLarge, classNames)} to={to}>
    {children}
  </Link>
);

export const CustomButton = ({ type = 'button', children, large = false, disabled, classNames }: ButtonProps) => (
  <Button type={type} disabled={disabled} className={cx('base-button', large && classes.buttonLarge, classNames)}>
    {children}
  </Button>
);

export const ButtonWrapper = ({ children }) => {
  return <Box className={classes.buttonWrapper}>{children}</Box>;
};

type ButtonProps = {
  children: React.ReactNode;
  large?: boolean;
  nav?: boolean;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  classNames?: string;
};
type LinkProps = { to: string } & ButtonProps;
