import { Flex, Tooltip, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash, IconBubbleText } from '@tabler/icons-react';

export const TableIcons = ({ openDetailsModal, openDeleteModal, openEditModal }) => {
  return (
    <Flex gap="md" justify="center">
      <Tooltip label="Edit">
        <ActionIcon onClick={openEditModal}>
          <IconEdit />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Delete">
        <ActionIcon color="red" onClick={openDeleteModal}>
          <IconTrash />
        </ActionIcon>
      </Tooltip>
      {/* <Tooltip label="Select as done">
        <Checkbox />
      </Tooltip> */}
      <Tooltip label="Show details">
        <ActionIcon color={'var(--primary)'} onClick={openDetailsModal}>
          <IconBubbleText />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};
