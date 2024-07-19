import cx from 'classix';
import classes from './styles.module.css';
import { forwardRef } from 'react';
import { Button, ButtonProps, createPolymorphicComponent } from '@mantine/core';

export const NotesButton = createPolymorphicComponent<'button', ButtonOwnProps>(
  forwardRef<HTMLButtonElement, ButtonOwnProps>(
    ({ children, classNames, leftIcon, rightIcon, size, noBorder, ...rest }, ref) => {
      return (
        <Button
          ref={ref}
          leftSection={leftIcon}
          rightSection={rightIcon}
          size={size}
          className={cx(classes.baseButton, classes[size], classNames)}
          {...rest}
        >
          {children}
        </Button>
      );
    }
  )
);

type ButtonOwnProps = {
  children: React.ReactNode;
  noBorder?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  classNames?: string;
  variant: string;
  size: string;
} & ButtonProps;
