import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NavBar from 'components/NavBar/NavBar.js';
import { theme } from '../utils/theme';

const StyledWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  background: ${({ theme }) => theme.colors.dark};
  /* position: relative; */
`;

const MainLayout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <StyledWrapper>
      <NavBar />
      {children}
    </StyledWrapper>
  </ThemeProvider>
);

export default MainLayout;
