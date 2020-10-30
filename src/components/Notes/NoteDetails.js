import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toggleModalOpen } from 'reducers/modalReducer';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 5px solid ${({ theme }) => theme.colors.primary};
  z-index: 1;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  padding: 2rem;
  flex-direction: column;
  height: 50vh;
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

const NoteDetails = ({ isVisible, content, toggleModalOpen, onClose }) => {
  const handleOnclick = () => {
    toggleModalOpen();
  };

  return (
    <>
      <Wrapper isVisible={isVisible}>
        <p>{content}</p>
        <button onClick={onClose}>Close</button>
      </Wrapper>
    </>
  );
};

const mapDispatchToProps = {
  toggleModalOpen,
};

export default connect(null, mapDispatchToProps)(NoteDetails);
