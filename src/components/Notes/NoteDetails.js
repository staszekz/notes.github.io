import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  flex-direction: column;

  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  border: 5px solid ${({ theme }) => theme.colors.primary};
  z-index: 1;
  padding: 2rem;
  height: 60vh;
  width: min(60vw, 80vw);
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

const NoteDetails = ({ isVisible, content, onClose, title, created, onDelete, id }) => {
  const handleOnDelete = () => {
    onDelete(id);
  };

  return (
    <>
      <Wrapper isVisible={isVisible}>
        <h1>{title}</h1>
        <p>{content}</p>
        <p>Created: {created}</p>
        <button onClick={onClose}>Close</button>
        <button onClick={handleOnDelete}>Delete</button>
      </Wrapper>
    </>
  );
};

export default NoteDetails;
