import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import MainLayout from 'Layout/MainLayout';
import NavBar from 'components/NavBar/NavBar.js';
import GlobalStyles from 'Theme/GlobalStyle';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <MainLayout />
    </>
  );
};

export default App;
