import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { StyledButton } from '@notes/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faSave, faTrashAlt, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import ReactTooltip from 'react-tooltip';
import { StyledTd, StyledInput } from '@notes/components';
import { RootState } from '@notes/redux';

export const TodoInput = ({ title, deadline, completed, index, id, onSave, onDelete, onNoEdit }) => {
  const [editedInput, setEditedInput] = useState({ title, deadline, completed });
  const dispatch = useDispatch();

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
    setEditedInput({ ...editedInput, completed: !editedInput.completed });
  };

  const handleOnDelete = () => {
    onDelete(id);
  };

  const handleOnNoSave = () => {
    onNoEdit();
    setEditedInput({ title, deadline, completed });
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
        <StyledButton onClick={handleOnSave} data-tip data-for="save">
          <FontAwesomeIcon icon={faSave} />
        </StyledButton>
        <StyledButton onClick={handleOnNoSave} data-tip data-for="noEdit">
          <FontAwesomeIcon icon={faTimesCircle} />
        </StyledButton>

        <StyledButton onClick={handleOnDelete} data-tip data-for="delete">
          <FontAwesomeIcon icon={faTrashAlt} />
        </StyledButton>

        <StyledButton onClick={handleCompletedCheck} data-tip data-for="complete">
          {editedInput.completed ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : (
            <FontAwesomeIcon icon={faTimes} color="red" />
          )}
        </StyledButton>
      </StyledTd>

      <ReactTooltip id="save" place="top" effect="solid">
        Save changes
      </ReactTooltip>
      <ReactTooltip id="delete" place="top" effect="solid">
        Delete Task
      </ReactTooltip>
      <ReactTooltip id="noEdit" place="top" effect="solid">
        Quit without saving
      </ReactTooltip>
      <ReactTooltip id="complete" place="top" effect="solid">
        {completed ? 'Is task completed? YES' : 'Is task completed? NO'}
      </ReactTooltip>
    </tr>
  );
};
