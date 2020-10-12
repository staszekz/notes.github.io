// TodoItem.js
import React from 'react';
import styled, { css } from 'styled-components';
import editIcon from 'assets/icons/edit.svg';
import deleteIcon from 'assets/icons/trash.svg';
import { DATABASE_URL } from 'utils/database';

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

const StyledTd = styled.td`
  cursor: pointer;
`;

export const StyledButton = styled.button`
  color: black;
  height: 40px;
  width: 40px;
  border-radius: 10px;
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
      <td className="align-middle">
        <StyledButton onClick={handleOnEdit}>
          <img src={editIcon} />{' '}
        </StyledButton>
      </td>
      <td className="align-middle">
        <StyledButton onClick={handleOnDelete}>
          <img src={deleteIcon} />
        </StyledButton>
      </td>
      <StyledTdWithHover deadline className="align-middle" as="td">
        {deadline}
      </StyledTdWithHover>
      <StyledTd className="align-middle" onClick={handleCompletedCheck}>
        {completed ? '✔️' : '❌'}
      </StyledTd>
    </tr>
  );
};

export default TodoItem;
