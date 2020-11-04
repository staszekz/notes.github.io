import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledButton } from 'components/Button/Button';
import { StyledButtonWrapper } from 'components/Form/Form';
import { StyledH1 } from 'components/H1/H1';
import { StyledModalInput, StyledTextarea } from 'components/Form/Form';

const Wrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
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
    width: 90%;
  }
  ${({ theme }) => theme.media.landscape} {
    width: 80%;
  }
`;

const StyledContent = styled.p`
  width: 90%;
  height: 70%;
  background-color: ${({ theme }) => theme.colors.lightDark};
  border-radius: 5px;
  padding: 1rem;
  overflow: auto;
  text-align: center;
`;

const StyledDate = styled.div`
  align-self: flex-end;
  padding: 0.5rem;
  margin-right: 5%;
`;

const NoteDetails = ({ isVisible, content, onClose, title, created, onDelete, id }) => {
  const handleOnDelete = () => {
    onDelete(id);
  };

  const [edited, setEdited] = useState(false);
  const handleEdit = () => {
    setEdited(!edited);
    console.log('edited', id);
  };

  return (
    <>
      <Wrapper isVisible={isVisible}>
        {edited ? (
          <>
            <StyledModalInput notes value={title}></StyledModalInput>
            <StyledTextarea notes value={content} />
          </>
        ) : (
          <>
            <StyledH1>{title}</StyledH1>
            <StyledContent>{content}</StyledContent>
          </>
        )}

        <StyledDate>Created: {created}</StyledDate>
        <StyledButtonWrapper>
          <StyledButton onClick={onClose}>Close</StyledButton>
          {edited ? (
            <StyledButton onClick={handleEdit}>Save</StyledButton>
          ) : (
            <StyledButton onClick={handleEdit}>Edit</StyledButton>
          )}
          <StyledButton onClick={handleOnDelete}>Delete</StyledButton>
        </StyledButtonWrapper>
      </Wrapper>
    </>
  );
};

export default NoteDetails;
