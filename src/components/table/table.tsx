import React from 'react';
import { MantineReactTable } from 'mantine-react-table';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@notes/components';

export function Table({ table }) {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <MantineReactTable table={table} />
      <Modal opened={opened} close={close} />
    </>
  );
}
