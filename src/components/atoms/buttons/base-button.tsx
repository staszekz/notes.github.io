import cx from 'classix';
import classes from './styles.module.css';
import { Button } from '@mantine/core';

export function BaseButton<T>({
  children,
  size = 'medium',
  disabled,
  classNames,
  variant = 'primary',
  Component = Button,
  componentProps,
  leftIcon,
  rightIcon
}: ButtonProps<T>) {
  return (
    <Component
      disabled={disabled}
      className={cx(classes.baseButton, classes[size], classes[variant], classNames)}
      {...componentProps}
    >
      {leftIcon && <span className={classes.leftIcon}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={classes.rightIcon}>{rightIcon}</span>}
    </Component>
  );
}

type ButtonProps<T> = {
  Component?: React.ElementType;
  classNames?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  variant?: 'transparent' | 'white' | 'primary' | 'danger' | 'success' | 'warning';
  componentProps?: T;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
};
