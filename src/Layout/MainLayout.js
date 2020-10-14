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
  left: 85vw;
  width: 50px;
  height: 50px;
  z-index: 2;
  display: ${({ button }) => (button ? 'flex' : 'none')};
`;

const StyledWrapper = styled.div`
background-color: ${({ theme }) => theme.colors.dark};
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
    <ThemeProvider theme={theme} isModalOpen={isModalOpen}>
        <StyledAddItemButton onClick={handleIsVisible} button={button}>
          <FontAwesomeIcon icon={faPlus} />
        </StyledAddItemButton>
        <Modal onAdd={handleAddTask} isVisible={isModalOpen} />
        <NavBar />
        <StyledWrapper isModalOpen={isModalOpen}>{children}</StyledWrapper>
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
