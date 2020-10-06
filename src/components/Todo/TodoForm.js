import React from 'react';
import styled from 'styled-components';
import saveIcon from 'assets/icons/save.svg';
import { StyledButton } from 'components/Todo/TodoItem';
import { DATABASE_URL } from 'utils/database';

const TodoForm = ({ todo, index, onSave }) => {
  // const handleOnSave = id => {
  //   fetch(`${DATABASE_URL}/todos/${id}.json`, {
  //     method: 'PUT',
  //     body: JSON.stringify(value),
  //   }).then(() => {
  //     onSave();
  //   });
  // };

  return (
    <>
      <tr key={todo.id}>
        {console.log(`todo item`, todo)}
        <td className="align-middle">{index + 1}</td>
        <td className="align-middle">
          <input className="align-middle text-xl-left" as="td" value={todo.content} />
        </td>

        <td className="align-middle">
          <StyledButton onClick={() => onSave(todo.id)}>
            <img src={saveIcon} alt="save icon" />
          </StyledButton>
        </td>
        <td className="align-middle">
          <input value={todo.deadline} />
        </td>
        <td className="align-middle">{todo.completed ? '✔️' : '✖️'}</td>
      </tr>
    </>
  );
};

export default TodoForm;
