import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye } from '@fortawesome/free-regular-svg-icons';
import { StyledTdWithHover } from 'components/Todo/TodoItem';
import { StyledButton } from 'components/Todo/TodoItem';

const NoteItem = ({ title, index, id, created, showDetails, onDelete }) => {
  const handleToggleShow = () => {
    showDetails(id);
  };
  const handleOnDelete = () => {
    onDelete(id);
  };
  return (
    <tr key={id}>
      <td className="align-middle">{index + 1}</td>
      <StyledTdWithHover className="align-middle">{title}</StyledTdWithHover>
      <StyledTdWithHover created className="align-middle">
        {created}
      </StyledTdWithHover>
      <td className="align-middle">
        <StyledButton onClick={handleToggleShow}>
          <FontAwesomeIcon icon={faEye} />
        </StyledButton>
        <StyledButton onClick={handleOnDelete}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </StyledButton>
      </td>
    </tr>
  );
};

export default NoteItem;
