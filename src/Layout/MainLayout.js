import React from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import withContext from 'components/context/withContext';
import NavBar from 'components/NavBar/NavBar.js';
import { theme } from '../utils/theme';
import { StyledButton } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { toggleModalOpen } from 'reducers/modalReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

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

const MainLayout = ({
  children,
  onAddFetch,
  isModalOpen,
  toggleModalOpen,
  button,
  pageContext,
}) => {
  const handleIsVisible = () => {
    toggleModalOpen();
  };

  const handleAddTask = () => {
    toggleModalOpen();
    // setCreationDate();
    onAddFetch();
  };

  return (
    <ThemeProvider theme={theme} isModalOpen={isModalOpen}>
      <StyledAddItemButton onClick={handleIsVisible} button={button} data-tip data-for="addItem">
        <FontAwesomeIcon icon={faPlus} />
      </StyledAddItemButton>
      <ReactTooltip id="addItem" place="top" effect="solid">
        {`Add new ${pageContext === 'todos' ? 'task' : 'note'}`}
      </ReactTooltip>
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
export default withContext(connect(mapStateToProps, mapDispatchToProps)(MainLayout));
