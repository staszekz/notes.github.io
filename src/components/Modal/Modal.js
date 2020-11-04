import React from 'react';
import styled from 'styled-components';
import AddTask from 'components/Form/Form';

const StyledWrapper = styled.div`
  border: 5px solid ${({ theme }) => theme.colors.primary};
  z-index: 1;
  position: fixed;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  padding: 2rem;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50%;
  width: 50%;
  background-color: ${({ theme }) => theme.colors.dark};
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.25s ease-in-out;

  ${({ theme }) => theme.media.phone} {
    height: 60%;
    width: 90%;
  }
  ${({ theme }) => theme.media.landscape} {
    height: 60%;
    width: 80%;
  }
`;

const Modal = ({ isVisible, onAdd }) => {
  return (
    <StyledWrapper isVisible={isVisible}>
      <AddTask onAdd={onAdd}></AddTask>
    </StyledWrapper>
  );
};

export default Modal;
