import { CloseButton, Indicator } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { ReactNode } from 'react';

export function EditIndicator({
  children,
  offset,
  onClick,
  disabled
}: {
  children: ReactNode;
  offset?: number;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <Indicator
      disabled={disabled}
      offset={offset}
      color={'transparent'}
      label={
        <CloseButton
          bg={'var(--primary)'}
          c={'var(--white)'}
          radius={'50%'}
          onClick={onClick}
          icon={<IconEdit size={18} stroke={1.5} />}
        />
      }
    >
      {children}
    </Indicator>
  );
}
