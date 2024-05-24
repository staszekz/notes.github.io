import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { NavBar, StyledButton } from '@notes/components';
import { toggleModalOpen } from '@notes/redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Box } from '@mantine/core';
import classes from './layout.module.css';

type Props = {
  isModalOpen?: boolean;
  button?: boolean;
};

export const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Box className={classes.mainLayout}>{children}</Box>
    </>
  );
};
