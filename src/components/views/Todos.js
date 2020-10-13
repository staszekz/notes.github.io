import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MainLayout from 'Layout/MainLayout';
import GlobalStyle from 'Theme/GlobalStyle';
import { StyledH1 } from 'components/H1/H1';
import { StyledH2 } from 'components/H1/H1';
import TodoItem from 'components/Todo/TodoItem';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import TodoInput from 'components/Todo/TodoInput';

import { fetchTodos, addNewTask, setCompleted, deleteTask, editTask } from 'reducers/todosReducer';

const StyledTodoList = styled.div`
  width: 60%;
  margin: 0 auto;
  position: relative;
  top: 13vh;

  @media (max-width: 1200px) {
    width: 80%;
  }
`;

const StyledTable = styled(Table)`
  color: ${({ theme }) => theme.colors.white};
`;

const Todos = ({ isLoading, fetchTodos, todos, deleteTask, setCompleted, editTask }) => {
  const [editID, setEditedID] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleOnSave = (task, editedId) => {
    editTask(task, editedId);
    setEditedID(null);
  };

  const handleEdit = editedID => {
    setEditedID(editedID);
  };

  // handleDeleteClick = deletedId => {
  //   fetch(`${DATABASE_URL}/todos/${deletedId}.json`, {
  //     method: 'DELETE',
  //   }).then(() => {
  //     this.fetchTodos();
  //   });
  // };

  return (
    <>
      <GlobalStyle />
      <MainLayout onAddFetch={fetchTodos}>
        <StyledTodoList>
          {/* tutaj wrzucić LI LOADING  */}
          <StyledH1>Todos List</StyledH1>
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
                  .map((todo, index) =>
                    editID === todo.id ? (
                      <TodoInput
                        key={todo.id}
                        id={todo.id}
                        index={index}
                        content={todo.content}
                        completed={todo.completed}
                        deadline={todo.deadline}
                        onSave={handleOnSave}
                        onDelete={deleteTask}
                        onCompleteCheck={setCompleted}
                      />
                    ) : (
                      <TodoItem
                        key={todo.id}
                        id={todo.id}
                        index={index}
                        content={todo.content}
                        completed={todo.completed}
                        deadline={todo.deadline}
                        onEdit={handleEdit}
                        onDelete={deleteTask}
                        onCompleteCheck={setCompleted}
                      />
                    ),
                  )
              )}
            </tbody>
          </StyledTable>
          {/* </>} */}
        </StyledTodoList>
        {!isLoading && !todos.length && (
          <StyledH2>Your todo list is empty! Enter new task! </StyledH2>
        )}
      </MainLayout>
    </>
  );
};

const mapStateToProps = state => ({
  todos: state.todosReducer.todos,
  isLoading: state.todosReducer.isLoading,
  error: state.todosReducer.error,
});
const mapDispatchToProps = {
  fetchTodos,
  addNewTask,
  setCompleted,
  deleteTask,
  editTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
