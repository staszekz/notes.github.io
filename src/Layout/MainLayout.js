import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NavBar from 'components/NavBar/NavBar.js';
import { theme } from '../utils/theme';
import { StyledButton } from 'components/Button/Button';
import Modal from 'components/Modal/Modal'


const StyledAddItemButton = styled(StyledButton)`
position: fixed;
top: 90%;
left: 90%;
width: 60px;
height: 60px;
z-index: 2;

`;

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



const MainLayout = ({ children, onAdd }) => {

  const [isNewItemBarVisible, setIsNewItemBarVisible] = useState(false);

  const handleIsVisible = () => {
    setIsNewItemBarVisible(prevState => !prevState);
  };

  const isModalOpen = () => {
    setIsNewItemBarVisible(prevState => !prevState);
    onAdd();
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledWrapper>
        <NavBar />
        <>
          {children}
          <StyledAddItemButton onClick={handleIsVisible}>➕</StyledAddItemButton>
          <Modal onAdd={isModalOpen} isVisible={isNewItemBarVisible} />
        </>
      </StyledWrapper>
    </ThemeProvider>
  )

};

export default MainLayout;
