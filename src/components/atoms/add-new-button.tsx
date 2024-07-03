import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import cx from 'classix';
import classes from './styles.module.css';

export const AddNewButton = ({ openNoteModal }) => {
  const handleClick = () => openNoteModal();

  return (
    <Button
      className={cx('base-button', classes.addButton)}
      leftSection={<IconPlus />}
      variant="contained"
      onClick={handleClick}
      aria-label="Add new"
    >
      Add
    </Button>
  );
};
