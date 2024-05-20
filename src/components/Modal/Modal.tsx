import React from 'react';
import { AddTask } from 'src/components/Form/Form';
import styled from 'styled-components';
import { Modal as MantineModal, Title } from '@mantine/core';
import { useLocation, useParams } from 'react-router';

const StyledWrapper = styled.div`
  border: 5px solid ${({ theme }) => theme.colors.primary};
  z-index: 1;
  position: fixed;
  display: ${({ isVisible }: { isVisible: boolean }) => (isVisible ? 'flex' : 'none')};
  padding: 2rem;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50%;
  width: 50%;
  background-color: ${({ theme }) => theme.colors.dark};
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.25s ease-in-out;

  ${({ theme }) => theme.media.phone} {
    height: 60%;
    width: 90%;
  }
  ${({ theme }) => theme.media.landscape} {
    height: 75%;
    width: 80%;
  }
`;

export const Modal = ({ opened, close, row, title }: Props) => {
  const { pathname } = useLocation();

  return (
    <MantineModal.Root size={'xl'} centered opened={opened} onClose={close}>
      <MantineModal.Overlay />
      <MantineModal.Content>
        <MantineModal.Header>
          <MantineModal.Title>
            <h2>{title}</h2>
          </MantineModal.Title>
          <MantineModal.CloseButton />
        </MantineModal.Header>
        <MantineModal.Body>
          <AddTask close={close} row={row} />
        </MantineModal.Body>
      </MantineModal.Content>
    </MantineModal.Root>
  );
};

type Props = {
  opened: boolean;
  close: () => void;
  row?: any;
  title: string;
};
