import { Box } from '@mantine/core';
import classes from './styles.module.css';
import cx from 'classix';

export const NotesHeader = ({ component, className, children }: Props) => {
  return (
    <Box fz={component} className={cx(className, classes[component])} component={'h2'}>
      {children}
    </Box>
  );
};

type Props = {
  children: React.ReactNode;
  component: 'h1' | 'h2';
  className?: string;
};
