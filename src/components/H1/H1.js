import React from 'react';
import styled from 'styled-components';

export const StyledH1 = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.font.bold};
  text-align: center;
  padding: 1rem;
`;


export const StyledH2 = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.font.bold};
  text-align: center;
  padding: 3rem;
  margin-bottom: 4rem;
  /* background-color: red; */
`;