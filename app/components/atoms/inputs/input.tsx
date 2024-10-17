import { Input } from '@mantine/core';
import classes from './styles.module.css';

export const NotesInput = () => {
  return <Input type="text" placeholder="Add new item" className={classes.input} />;
};
