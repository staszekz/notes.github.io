import { AddTask } from 'src/components/Form/Form';
import { Modal as MantineModal } from '@mantine/core';

export const Modal = ({ opened, close, row, title }: Props) => {
  return (
    <MantineModal size={'xl'} centered opened={opened} title={title} onClose={close}>
      <AddTask close={close} row={row} />
    </MantineModal>
  );
};

type Props = {
  opened: boolean;
  close: () => void;
  row?: any;
  title: React.ReactNode;
};
