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
import { StyledButton } from 'components/Todo/TodoItem';


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

const StyledInput = styled.input`
width: 40%;
height: 40px;
border: 2px solid ${({ theme }) => theme.colors.primary};
border-radius: 5px;
color: white;
background-color:${({ theme }) => theme.colors.dark}; 
margin-bottom: 0.5rem;
margin-right: 0.5rem;
${({theme})=> theme.media.tablet}{
  ::placeholder{
  font-size: 1.5rem;
}
}


`;

const StyledButtonClear = styled(StyledButton)`
width: 20%;
margin-bottom: 0.5rem;
`;

const StyledFiltersWrapper = styled.div`
width: 50%;
display: flex;
align-items: center;
justify-content: space-between;
${({theme})=> theme.media.tablet}{
  width: 100%;
}
${({theme})=> theme.media.landscape}{
  width: 100%;
}
`;


const Todos = ({ isLoading, fetchTodos, todos, deleteTask, setCompleted, editTask }) => {
  const [editID, setEditedID] = useState(null);
  const [filterContent, setFilterContent] = useState('');
  const [filterDeadline, setFilterDeadline] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOnSave = (task, editedId) => {
    editTask(task, editedId);
    setEditedID(null);
  };

  const handleEdit = editedID => {
    setEditedID(editedID);
  };

  const handleFilterContentChange = e => {
    setFilterContent(e.target.value);
  };
  const handleFilterDeadlineChange = e => {
    setFilterDeadline(e.target.value);
  };

  const clearFilter = () => {
    setFilterContent('');
    setFilterDeadline('');
  };

  return (
    <>
      <GlobalStyle />
      <MainLayout onAddFetch={fetchTodos} button="true">
        <StyledTodoList>
          {/* tutaj wrzucić LI LOADING  */}
          <StyledH1>Todos List</StyledH1>
          <StyledFiltersWrapper>

          <StyledInput
            placeholder="🔎 by content"
            value={filterContent}
            onChange={handleFilterContentChange}
          ></StyledInput>
          <StyledInput
            placeholder="🔎 by deadline"
            value={filterDeadline}
            onChange={handleFilterDeadlineChange}
          ></StyledInput>
          <StyledButtonClear onClick={clearFilter}>Clear</StyledButtonClear>
          </StyledFiltersWrapper>
          <StyledTable striped responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Content</th>
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
                  .filter(todo => (todo.content.toLowerCase().includes(filterContent.toLowerCase())
                  
                  ))
                  .filter(todo => (todo.deadline.toLowerCase().includes(filterDeadline.toLowerCase())
                  ))

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
