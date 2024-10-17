import { Textarea } from '@mantine/core';
import classes from './styles.module.css';

export const NotesTextarea = () => {
  return <Textarea placeholder="Add new item" className={classes.textarea} />;
};
