import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../utils/theme';

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.dark};
  position: relative;

  /* ::before {
    content: '';
    width: 40px;
    height: 40px;
    display: block;
    background: hotpink;
  } */
`;

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <StyledWrapper>{children}</StyledWrapper>
    </>
  </ThemeProvider>
);

export default Layout;
