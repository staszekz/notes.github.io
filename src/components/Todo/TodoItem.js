// TodoItem.js
import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';

export const StyledTdWithHover = styled.td`
  width: 50%;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  ${({ deadline }) =>
    deadline &&
    css`
      width: 10vw;
    `}
`;

export const StyledTd = styled.td`
  width: fit-content;
`;

export const StyledButton = styled.button`
  color: black;
  background: white;
  height: 40px;
  width: 40px;
  border-radius: 10px;
  ${({ theme }) => theme.media.phone} {
    height: 30px;
    width: 30px;
  }
`;

const TodoItem = ({ title, id, deadline, completed, index, onEdit, onDelete, onCompleteCheck }) => {
  const handleOnEdit = () => {
    onEdit(id);
  };

  const handleOnDelete = () => {
    onDelete(id);
  };

  const handleCompletedCheck = () => {
    onCompleteCheck(id, title, deadline, completed);
  };

  return (
    <tr key={id}>
      <td className="align-middle">{index + 1}</td>
      <StyledTdWithHover className="align-middle">{title}</StyledTdWithHover>
      <StyledTdWithHover deadline className="align-middle">
        {deadline}
      </StyledTdWithHover>
      <StyledTd className="align-middle">
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
      </StyledTd>
    </tr>
  );
};

export default TodoItem;
