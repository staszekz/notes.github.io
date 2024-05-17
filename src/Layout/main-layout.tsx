import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled  from 'styled-components';
import { NavBar, StyledButton } from '@notes/components';
import { toggleModalOpen } from '@notes/redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type Props = {
  isModalOpen?: boolean;
  button?: boolean;
};



const StyledWrapper = styled.div<Props>`
  background-color: ${({ theme }) => theme.colors.dark};
  display: flex
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
  marginTop: 12vh;
  max-width: 1280px;
 margin: 0 auto;
`;

export const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
    <StyledWrapper>
      {children}
    </StyledWrapper>
    </>
  );
};
