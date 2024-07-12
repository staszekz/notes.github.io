import { Box } from '@mantine/core';
import { ReactNode } from 'react';
import classes from './styles.module.css';

export const HomeWrapper = ({ children }: { children: ReactNode }) => (
  <Box className={classes.homeWrapper}>{children} </Box>
);
