import { Flex, Tooltip, ActionIcon } from '@mantine/core';

export const TableControls = ({ controls }) => {
  return (
    <Flex gap="md" justify="center">
      {controls.map((control, index) => {
        return (
          <Tooltip key={index} label={control.tooltipMessage}>
            <ActionIcon color={control.icon.color} onClick={control.onClick}>
              {control.icon.Component}
            </ActionIcon>
          </Tooltip>
        );
      })}
    </Flex>
  );
};
