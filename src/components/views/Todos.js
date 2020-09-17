import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from 'Layout/MainLayout';
import { StyledH1 } from 'components/H1/H1';
import TodoItem from 'components/Todo/TodoItem';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

const StyledTodoList = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-top: 12vh;
`;

const StyledTable = styled(Table)`
  color: ${({ theme }) => theme.colors.white};
`;

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://notes-and-todos-6756c.firebaseio.com/todos.json')
      .then(r => r.json())
      .then(todos => {
        const arrayTodos = todos
          ? Object.keys(todos).map(key => {
              return {
                id: key,
                ...todos[key],
              };
            })
          : [];
        console.log(arrayTodos);
        setTodos(arrayTodos);
        setIsLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      <StyledTodoList>
        <StyledH1>todos list</StyledH1>
        <StyledTable striped responsive>
          <thead>
            <tr>
              <th width={50}>#</th>
              <th>Content</th>
              <th width={100}>Deadline</th>
              <th width={100}>Completed</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="text-center">
                  <Spinner animation="border" />
                </td>
              </tr>
            ) : (
              todos
                // .filter(todo => {
                //   const textFilter = todo.title
                //     .toLowerCase()
                //     .includes(this.state.filter.toLowerCase());

                //   if (this.state.showCompleted && this.state.showInCompleted) {
                //     return textFilter;
                //   } else if (this.state.showCompleted) {
                //     return textFilter && todo.completed === true;
                //   } else if (this.state.showInCompleted) {
                //     return textFilter && todo.completed === false;
                //   } else {
                //     return false;
                //   }
                // })
                .map((todo, index) => {
                  return <TodoItem key={todo.id} index={index} todo={todo} />;
                })
            )}
          </tbody>
        </StyledTable>
      </StyledTodoList>
    </MainLayout>
  );
};
export default Todos;
