import { Box } from '@mantine/core';
import classes from './styles.module.css';

export const Bar = ({ children }) => {
  return <Box className={classes.bar}>{children}</Box>;
};

export const ButtonWrapper = ({ children }) => {
  return <Box className={classes.buttonWrapper}>{children}</Box>;
};

export const ButtonIconWrapper = ({ children }) => {
  return <Box className={classes.buttonIconWrapper}>{children}</Box>;
};
