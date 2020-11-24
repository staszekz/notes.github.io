import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { editNote } from 'reducers/notesReducer';
import { StyledButton } from 'components/Button/Button';
import {
  StyledModalInput,
  StyledButtonWrapper,
  StyledTextarea,
} from 'components/atoms/StyledInputs';
import { StyledH1 } from 'components/H1/H1';

const Wrapper = styled.td`
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

const StyledDate = styled.p`
  align-self: flex-end;
  padding: 0.5rem;
  margin-right: 5%;
`;

const NoteDetails = ({ isVisible, content, onClose, title, created, onDelete, id, editNote }) => {
  const handleOnDelete = () => {
    onDelete(id);
  };

  const [edited, setEdited] = useState(false);
  const [editedNote, setEditedNote] = useState({ content, title, created });

  const handleEdit = () => {
    setEdited(!edited);
  };

  const handleInputChange = e => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
  };

  const onSave = () => {
    editNote(editedNote, id);
    setEdited(!edited);
  };

  return (
    <tr key={id}>
      <Wrapper isVisible={isVisible}>
        {edited ? (
          <>
            <StyledModalInput
              notes
              onChange={handleInputChange}
              value={editedNote.title}
              name="title"
            ></StyledModalInput>
            <StyledTextarea
              notes
              onChange={handleInputChange}
              name="content"
              value={editedNote.content}
            />
          </>
        ) : (
          <>
            <StyledH1>{editedNote.title}</StyledH1>
            <StyledContent>{editedNote.content}</StyledContent>
          </>
        )}

        <StyledDate>Created: {created}</StyledDate>
        <StyledButtonWrapper>
          <StyledButton to="/#" onClick={onClose}>
            Close
          </StyledButton>
          {edited ? (
            <StyledButton to="/#" onClick={onSave}>
              Save
            </StyledButton>
          ) : (
            <StyledButton to="/#" onClick={handleEdit}>
              Edit
            </StyledButton>
          )}
          <StyledButton onClick={handleOnDelete}>Delete</StyledButton>
        </StyledButtonWrapper>
      </Wrapper>
    </tr>
  );
};

const mapDispatchToProps = {
  editNote,
};

export default connect(null, mapDispatchToProps)(NoteDetails);
