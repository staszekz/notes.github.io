import React from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import NavBar from 'components/NavBar/NavBar.js';
import { theme } from '../utils/theme';
import { StyledButton } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { toggleModalOpen } from 'reducers/modalReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const StyledAddItemButton = styled(StyledButton)`
  position: fixed;
  top: 85vh;
  left: 80vw;
  width: 50px;
  height: 50px;
  z-index: 2;
  display: ${({ button }) => (button ? 'flex' : 'none')};
`;

const StyledWrapper = styled.div`
  height: 100vh;
  width: 100%;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  background: ${({ theme }) => theme.colors.dark};

  filter: blur(${({ isModalOpen }) => isModalOpen && '5px'});
`;

const MainLayout = ({ children, onAddFetch, isModalOpen, toggleModalOpen, button }) => {
  const handleIsVisible = () => {
    toggleModalOpen();
  };

  const handleAddTask = () => {
    toggleModalOpen();
    onAddFetch();
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledWrapper isModalOpen={isModalOpen}>
        <NavBar />
        <>
          {children}
          <StyledAddItemButton onClick={handleIsVisible} button={button}>
            <FontAwesomeIcon icon={faPlus} />
          </StyledAddItemButton>
        </>
      </StyledWrapper>
      <Modal onAdd={handleAddTask} isVisible={isModalOpen} />
    </ThemeProvider>
  );
};

const mapStateToProps = state => ({
  isModalOpen: state.modalReducer.isModalOpen,
});
const mapDispatchToProps = {
  toggleModalOpen,
};
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
