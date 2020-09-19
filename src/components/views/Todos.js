import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from 'Layout/MainLayout';
import GlobalStyle from 'Theme/GlobalStyle';
import { StyledH1 } from 'components/H1/H1';
import TodoItem from 'components/Todo/TodoItem';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import TodoForm from 'components/Todo/TodoForm';
import { DATABASE_URL } from 'utils/database';

const data = [
  {
    id: 1,
    content: 'jakies zadanie do zrobienia',
    deadline: 'jutro 12',
    completed: false,
  },
  {
    id: 2,
    content: 'drugie zadanie',
    deadline: '2020.12.03',
    completed: true,
  },
];

const StyledTodoList = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-top: 12vh;

  @media (max-width: 1200px) {
    width: 80%;
  }
`;

const StyledTable = styled(Table)`
  color: ${({ theme }) => theme.colors.white};
`;

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editedID, setEditedID] = useState(null);

  // const fetchTodos = () => {
  //   fetch(`${DATABASE_URL}/todos.json`)
  //     .then(r => r.json())
  //     .then(todos => {
  //       const arrayTodos = todos
  //         ? Object.keys(todos).map(key => {
  //             return {
  //               id: key,
  //               ...todos[key],
  //             };
  //           })
  //         : [];
  //       console.log(arrayTodos);
  //       setTodos(arrayTodos);
  //       setIsLoading(false);
  //     });
  // };

  useEffect(() => {
    // fetchTodos();
  }, []);

  const resetEditId = () => {
    setEditedID(null);
  };

  const saveClicked = () => {
    // fetchTodos();
    resetEditId();
  };

  const handleEdit = editID => {
    setEditedID(editID);
  };

  return (
    <>
      <GlobalStyle />
      <MainLayout>
        <StyledTodoList>
          <StyledH1>todos list</StyledH1>
          <StyledTable striped responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Content</th>
                <th>Edit</th>
                <th>Remove</th>
                <th>Deadline</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={12}>
                    <Spinner animation="border" />
                  </td>
                </tr>
              ) : (
                data
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
                  .map((todo, index) => (
                    <>
                      {console.log(`todo`, todo)}

                      {editedID === todo.id ? (
                        <TodoForm key={todo.id} index={index} todo={todo} />
                      ) : (
                        <TodoItem
                          key={todo.id}
                          index={index}
                          todo={todo}
                          onSave={saveClicked}
                          onEdit={handleEdit}
                        />
                      )}
                    </>
                  ))
              )}
            </tbody>
          </StyledTable>
        </StyledTodoList>
      </MainLayout>
    </>
  );
};
export default Todos;
