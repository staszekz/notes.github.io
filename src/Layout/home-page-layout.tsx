import React from 'react';
import { NavBar } from '@notes/components';

export const HomePageLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
