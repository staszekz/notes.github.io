import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MainLayout from 'Layout/MainLayout';
import GlobalStyle from 'Theme/GlobalStyle';
import { StyledH1, StyledH2 } from 'components/H1/H1';
import TodoItem from 'components/Todo/TodoItem';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import TodoInput from 'components/Todo/TodoInput';
import withContext from 'components/context/withContext';
import Filters from 'components/filters/Filters';

import { fetchTodos, addNewTask, setCompleted, deleteTask, editTask } from 'reducers/todosReducer';

const StyledTodoList = styled.div`
  width: 70%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  top: 13vh;

  ${({ theme }) => theme.media.phone} {
    width: 95%;
  }
  ${({ theme }) => theme.media.landscape} {
    width: 95%;
  }
`;

const StyledTable = styled(Table)`
  color: ${({ theme }) => theme.colors.white};
  table-layout: auto;
`;

const Todos = ({ isLoading, fetchTodos, todos, deleteTask, setCompleted, editTask }) => {
  const [editID, setEditedID] = useState('');
  const [filterTitle, setFilterTitle] = useState('');
  const [filterDeadline, setFilterDeadline] = useState('');

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

  const handleFilterTitleChange = e => {
    setFilterTitle(e.target.value);
  };
  const handleFilterDeadlineChange = e => {
    setFilterDeadline(e.target.value);
  };

  const clearFilter = () => {
    setFilterTitle('');
    setFilterDeadline('');
  };

  const handleNoEdit = editedId => {
    setEditedID(null);
  };
  return (
    <>
      <GlobalStyle />
      <MainLayout onAddFetch={fetchTodos} button="true">
        <StyledTodoList>
          <StyledH1>Todos List</StyledH1>
          <Filters
            onTitleFilter={handleFilterTitleChange}
            onDeadlineFilter={handleFilterDeadlineChange}
            titleText={filterTitle}
            deadlineText={filterDeadline}
            onClear={clearFilter}
          />
          <StyledTable striped responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>To Do</th>
                <th>Deadline</th>
                <th>Edition</th>
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
                  .filter(todo => todo.title.toLowerCase().includes(filterTitle.toLowerCase()))
                  .filter(todo =>
                    todo.deadline.toLowerCase().includes(filterDeadline.toLowerCase()),
                  )

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
                        title={todo.title}
                        completed={todo.completed}
                        deadline={todo.deadline}
                        onSave={handleOnSave}
                        onDelete={deleteTask}
                        onCompleteCheck={setCompleted}
                        onNoEdit={handleNoEdit}
                      />
                    ) : (
                      <TodoItem
                        key={todo.id}
                        id={todo.id}
                        index={index}
                        title={todo.title}
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

export default withContext(connect(mapStateToProps, mapDispatchToProps)(Todos));
