import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { StyledButton } from 'components/Todo/TodoItem';
import { editTask } from 'reducers/todosReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faSave, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { StyledTd } from 'components/Todo/TodoItem';

export const StyledInput = styled.input`
  background-color: lightgray;
  border: none;
  border-radius: 20px;
  width: 100%;
  padding: 0.5rem 0.5rem;
  float: left;
  text-align: center;

  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1.2rem;
  }
`;

const TodoInput = ({ title, deadline, completed, index, id, onSave, onCompleteCheck }) => {
  const [editedInput, setEditedInput] = useState({ title, deadline, completed });

  const handleOnSave = () => {
    onSave(editedInput, id);
  };

  const onEnterSave = e => {
    if (e.key === 'Enter') {
      handleOnSave();
    }
  };

  const handleInputChange = e => {
    setEditedInput({ ...editedInput, [e.target.name]: e.target.value });
  };

  const handleCompletedCheck = () => {
    onCompleteCheck(id, { ...editedInput });
  };

  const handleOnDelete = () => {
    console.log('deleted', id);
  };
  return (
    <tr key={id}>
      <td className="align-middle">{index + 1}</td>
      <td className="align-middle">
        <StyledInput
          name="title"
          value={editedInput.title}
          onChange={handleInputChange}
          onKeyDown={onEnterSave}
        />
      </td>

      <td className="align-middle">
        <StyledInput
          name="deadline"
          deadline
          value={editedInput.deadline}
          onChange={handleInputChange}
          onKeyDown={onEnterSave}
        />
      </td>
      <StyledTd className="align-middle">
        <StyledButton onClick={handleOnSave}>
          <FontAwesomeIcon icon={faSave} />
        </StyledButton>

        <StyledButton onClick={handleOnDelete}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </StyledButton>

        <StyledButton onClick={handleCompletedCheck}>
          {completed ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : (
            <FontAwesomeIcon icon={faTimes} color="red" />
          )}
        </StyledButton>
      </StyledTd>
    </tr>
  );
};
const mapDispatchToProps = {
  editTask,
};

export default connect(null, mapDispatchToProps)(TodoInput);
