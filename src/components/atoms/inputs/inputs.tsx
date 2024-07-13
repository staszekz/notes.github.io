import { Input, Textarea } from '@mantine/core';
import cx from 'classix';
import classes from './styles.module.css';

export const NotesInput = ({ placeholder, classnames, type = 'text' }: InputProps) => {
  return <Input type={type} placeholder={placeholder} className={cx(classnames, classes.input)} />;
};
export const NotesTextarea = ({ placeholder, classnames }: InputProps) => {
  return <Textarea placeholder={placeholder} className={cx(classnames, classes.textarea)} />;
};

type InputProps = {
  placeholder: string;
  type?: 'text' | 'password' | 'email' | 'number';
  classnames?: string;
};
