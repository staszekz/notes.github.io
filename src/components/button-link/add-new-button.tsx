import React from 'react';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { theme } from '@notes/theme';
import styled from 'styled-components';
import { StyledButton } from './styled';

const StyledAddButton = styled(StyledButton)`
  width: fit-content;
  /* bottom: 10px; */
  padding: 10px 20px;
  box-shadow: ({theme}) => -5px 3px 15px theme.colors.;
  background-color: ${({ theme }) => theme.colors.dark};
  border: 3px solid ${({ theme }) => theme.colors.primary};
`;

export const AddNewButton = ({ openModal }) => {
  const handleClick = () => openModal();

  return (
    <StyledAddButton leftSection={<IconPlus />} variant="contained" onClick={handleClick} aria-label="Add new ">
      Add
    </StyledAddButton>
  );
};
