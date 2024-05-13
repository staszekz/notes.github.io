import React from 'react';
import { ThemeProvider } from 'styled-components';
import { NavBar } from '@notes/components';
import { theme } from '@notes/theme';

export const HomePageLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      {children}
    </ThemeProvider>
  );
};
