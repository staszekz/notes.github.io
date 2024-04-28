import React from 'react';
import { ThemeProvider } from 'styled-components';
import NavBar from 'components/NavBar/NavBar.js';
import { theme } from '../utils/theme';

const HomePageLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      {children}
    </ThemeProvider>
  );
};

export default HomePageLayout;
