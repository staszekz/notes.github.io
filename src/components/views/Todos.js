import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MainLayout from 'Layout/MainLayout';
import GlobalStyle from 'Theme/GlobalStyle';
import { StyledH1 } from 'components/H1/H1';
import { StyledH2 } from 'components/H1/H1';
import TodoItem from 'components/Todo/TodoItem';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { DATABASE_URL } from 'utils/database';
import TodoInput from 'components/Todo/TodoInput';
import AddTask from 'components/Form/Form';

import { fetchTodos, addNewTask, setCompleted, deleteTask, editTask } from 'reducers';

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

class Todos extends React.Component {
  state = {
    editID: null,
  };

  componentDidMount() {
    this.props.fetchTodos();
  }
  handleOnSave = (task, editedId) => {
    this.props.editTask(task, editedId);
    this.setState({
      editID: null,
    });
  };

  handleEdit = editID => {
    this.setState({ editID });
  };

  // handleDeleteClick = deletedId => {
  //   fetch(`${DATABASE_URL}/todos/${deletedId}.json`, {
  //     method: 'DELETE',
  //   }).then(() => {
  //     this.fetchTodos();
  //   });
  // };

  render() {
    const { isLoading, fetchTodos, todos, deleteTask, setCompleted } = this.props;
    return (
      <>
        <GlobalStyle />
        <MainLayout onAdd={fetchTodos}>
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
                      this.state.editID === todo.id ? (
                        <TodoInput
                          key={todo.id}
                          id={todo.id}
                          index={index}
                          content={todo.content}
                          completed={todo.completed}
                          deadline={todo.deadline}
                          onSave={this.handleOnSave}
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
                          onEdit={this.handleEdit}
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
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
  isLoading: state.isLoading,
  error: state.error,
});
const mapDispatchToProps = {
  fetchTodos,
  addNewTask,
  setCompleted,
  deleteTask,
  editTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
