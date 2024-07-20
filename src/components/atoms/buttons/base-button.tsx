import cx from 'classix';
import classes from './styles.module.css';
import { forwardRef } from 'react';
import { Button, ButtonProps, createPolymorphicComponent } from '@mantine/core';

export const NotesButton = createPolymorphicComponent<'button', ButtonOwnProps>(
  forwardRef<HTMLButtonElement, ButtonOwnProps>(({ children, classNames, leftIcon, rightIcon, ...rest }, ref) => {
    return (
      <Button
        ref={ref}
        leftSection={leftIcon}
        rightSection={rightIcon}
        className={cx(classes.baseButton, classNames)}
        {...rest}
      >
        {children}
      </Button>
    );
  })
);

type ButtonOwnProps = {
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  classNames?: string;
} & ButtonProps;
