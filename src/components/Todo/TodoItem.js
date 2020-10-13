// TodoItem.js
import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';

const StyledTdWithHover = styled.td`
  width: 30vw;
  /* height: 300px; */
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  ${({ deadline }) =>
    deadline &&
    css`
      width: 8vw;
    `}
`;

export const StyledButton = styled.button`
  color: black;
  background: white;
  height: 40px;
  width: 40px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodoItem = ({
  content,
  id,
  deadline,
  completed,
  index,
  onEdit,
  onDelete,
  onCompleteCheck,
}) => {
  const handleOnEdit = () => {
    onEdit(id);
  };

  const handleOnDelete = () => {
    onDelete(id);
  };

  const handleCompletedCheck = () => {
    onCompleteCheck(id, content, deadline, completed);
  };

  return (
    <tr key={id}>
      <td className="align-middle">{index + 1}</td>
      <StyledTdWithHover className="align-middle text-xl-left" as="td">
        {content}
      </StyledTdWithHover>
      <StyledTdWithHover deadline className="align-middle" as="td">
        {deadline}
      </StyledTdWithHover>
      <td className="align-middle">
        <StyledButton onClick={handleOnEdit}>
          <FontAwesomeIcon icon={faEdit} />
        </StyledButton>
      </td>
      <td className="align-middle">
        <StyledButton onClick={handleOnDelete}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </StyledButton>
      </td>

      <td className="align-middle">
        <StyledButton onClick={handleCompletedCheck}>
          {completed ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : (
            <FontAwesomeIcon icon={faTimes} color="red" />
          )}
        </StyledButton>
      </td>
    </tr>
  );
};

export default TodoItem;
