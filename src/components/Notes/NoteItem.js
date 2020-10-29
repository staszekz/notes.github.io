import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { StyledTdWithHover } from 'components/Todo/TodoItem';
import { StyledButton } from 'components/Todo/TodoItem';

const NoteItem = ({ title, date, index, id }) => {
  const handleOnEdit = () => {
    console.log('edited');
  };
  const handleOnDelete = () => {
    console.log('deleted');
  };
  return (
    <tr key={id}>
      <td className="align-middle">{index + 1}</td>
      <StyledTdWithHover className="align-middle">{title}</StyledTdWithHover>
      <StyledTdWithHover deadline className="align-middle">
        {date}
      </StyledTdWithHover>
      <td className="align-middle">
        <StyledButton onClick={handleOnEdit}>
          <FontAwesomeIcon icon={faEdit} />
        </StyledButton>
        <StyledButton onClick={handleOnDelete}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </StyledButton>
      </td>
      {/* <StyledTd className="align-middle">
        <StyledButton onClick={handleOnEdit}>
          <FontAwesomeIcon icon={faEdit} />
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
      </StyledTd> */}
    </tr>
  );
};

export default NoteItem;
