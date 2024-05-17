
import React from 'react';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { theme } from '@notes/theme';
import styled from 'styled-components';
import { StyledButton } from './styled';


const StyledAddButton = styled(StyledButton)`
width: fit-content;
bottom: 10px;
padding: 10px 20px;
`
export const AddNewButton = ({onClick}) => {
  return (
    <StyledAddButton 
      leftSection={<IconPlus/>}
      variant="contained"
      onClick={onClick} 
      aria-label="Add new "
    >
      Add
    </StyledAddButton>
  );
}

