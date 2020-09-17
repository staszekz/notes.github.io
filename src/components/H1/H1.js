import React from 'react';
import styled from 'styled-components';

export const StyledH1 = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.font.bold};
  text-align: center;
  padding: 1rem;
`;
