// TodoItem.js
import React from 'react';
import styled from 'styled-components';

const StyledTd = styled.td`
  color: 'pink';
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TodoItem = ({ todo, index }) => {
  return (
    <tr key={todo.id}>
      <td>{index + 1}</td>
      <StyledTd as="td">{todo.content}</StyledTd>
      <td>{todo.deadline}</td>
      <td>{todo.completed ? '✔️' : '✖️'}</td>
    </tr>
  );
};

export default TodoItem;
