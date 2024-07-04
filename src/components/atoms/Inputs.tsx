import { Box, Input, Textarea } from '@mantine/core';
import classes from './styles.module.css';

export const NotesInput = () => {
  return <Input type="text" placeholder="Add new item" className={classes.input} />;
};
export const NotesTextarea = () => {
  return <Textarea placeholder="Add new item" className={classes.textarea} />;
};
