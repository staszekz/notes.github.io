// TodoItem.js
import React, { useState } from 'react';
import styled from 'styled-components';
import editIcon from 'assets/icons/edit.svg';
import saveIcon from 'assets/icons/save.svg';
import deleteIcon from 'assets/icons/trash.svg';
import { DATABASE_URL } from 'utils/database';

const StyledTdWithHover = styled.td`
  min-width: 30vw;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledButton = styled.button`
  color: black;
  height: 40px;
  width: 40px;
  border-radius: 10px;
`;

const TodoItem = ({ todo, index, onSave, onEdit }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [value, setValue] = useState(todo);

  // const handleOnEdit = editID => {
  //   onEdit(editID);
  // };

  // const handleChangeValue = e => setValue(...value, (content = e.target.value));

  const handleOnDelete = () => {
    console.log(`deleted`);
  };

  return (
    <tr key={todo.id}>
      {console.log(`todo item`, todo)}
      <td className="align-middle">{index + 1}</td>
      <StyledTdWithHover className="align-middle text-xl-left" as="td">
        {todo.content}
      </StyledTdWithHover>

      <td className="align-middle">
        <StyledButton onClick={() => onEdit(todo.id)}>
          <img src={editIcon} />{' '}
        </StyledButton>
      </td>
      <td className="align-middle">
        <StyledButton onClick={handleOnDelete}>
          {' '}
          <img src={deleteIcon} />
        </StyledButton>
      </td>
      <td className="align-middle"> {todo.deadline}</td>
      <td className="align-middle">{todo.completed ? '✔️' : '✖️'}</td>
    </tr>
  );
};

export default TodoItem;
