import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { NavBar, Modal, StyledButton } from '@notes/components';
import { toggleModalOpen } from '@notes/redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import { usePageTypeContext } from '@notes/hooks';
import { RootState } from '@notes/redux';
import { theme } from '@notes/theme';

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

export const MainLayout = ({ children, onAddFetch, button }) => {
  const pageContext = usePageTypeContext();
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state: RootState) => state.modalReducer);

  const handleIsVisible = () => {
    dispatch(toggleModalOpen());
  };

  const handleAddTask = () => {
    dispatch(toggleModalOpen());

    // setCreationDate();
    onAddFetch();
  };

  return (
    <>
      <StyledAddItemButton onClick={handleIsVisible} button={button} data-tip data-for="addItem">
        <FontAwesomeIcon icon={faPlus} />
      </StyledAddItemButton>
      <Modal onAdd={handleAddTask} isVisible={isModalOpen} />
      <NavBar />
      <StyledWrapper isModalOpen={isModalOpen}>{children}</StyledWrapper>
      <ReactTooltip id="addItem" place="top" effect="solid">
        {`Add new ${pageContext === 'todos' ? 'task' : 'note'}`}
      </ReactTooltip>
    </>
  );
};
