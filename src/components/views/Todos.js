import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from 'Layout/MainLayout';
import GlobalStyle from 'Theme/GlobalStyle';
import { StyledH1 } from 'components/H1/H1';
import TodoItem from 'components/Todo/TodoItem';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Todoinput from 'components/Todo/TodoInput';
import { DATABASE_URL } from 'utils/database';
import { render } from '@testing-library/react';
import TodoInput from 'components/Todo/TodoInput';

// const data = [
//   {
//     id: 1,
//     content: 'jakies zadanie do zrobienia',
//     deadline: 'jutro 12',
//     completed: false,
//   },
//   {
//     id: 2,
//     content: 'drugie zadanie',
//     deadline: '2020.12.03',
//     completed: true,
//   },
//   {
//     id: 3,
//     content: 'trzecie zadanie',
//     deadline: '2020.11.03',
//     completed: true,
//   },
// ];

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

class Todos extends React.Component {
  state = {
    todos: {},
    isLoading: true,
    editID: null,
  };

  fetchTodos = () => {
    fetch(`${DATABASE_URL}/todos.json`)
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
        // console.log(arrayTodos);
        this.setState({
          todos: arrayTodos,
          isLoading: false,
        });
      });
  };

  // resetEditId = () => {
  //   setEditedID(null);
  // };
  componentDidMount() {
    this.fetchTodos();
  }

  saveClicked = editID => {
    console.log(this.state.todos);
    this.fetchTodos();
    this.setState({
      editID: null,
    });
  };

  handleEdit = editID => {
    this.setState({ editID });
  };

  render() {
    const { todo } = this.props;
    const { isLoading } = this.state;
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
                  this.state.todos
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
                        {/* {console.log(`todo`, todo)} */}

                        {this.state.editID === todo.id ? (
                          <TodoInput
                            key={todo.id}
                            index={index}
                            todo={todo}
                            onSave={() => this.saveClicked(todo.id)}
                          />
                        ) : (
                          <TodoItem
                            key={todo.id}
                            index={index}
                            todo={todo}
                            onEdit={() => this.handleEdit(todo.id)}
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
  }
}
export default Todos;
