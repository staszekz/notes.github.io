import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export const AddNewButton = ({ openModal }) => {
  const handleClick = () => openModal();

  return (
    <Button
      leftSection={<IconPlus />}
      size="small"
      variant="transparent-border"
      onClick={handleClick}
      aria-label="Add new"
    >
      Add
    </Button>
  );
};
