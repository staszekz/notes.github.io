import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { StyledInput } from 'components/Todo/TodoInput';
import { StyledButton } from 'components/Button/Button';
import { addNewTask } from 'reducers/todosReducer';
import { toggleModalOpen } from 'reducers/modalReducer';
import { addNewNote } from 'reducers/notesReducer';
import withContext from 'components/context/withContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUndo } from '@fortawesome/free-solid-svg-icons';

const StyledLabel = styled.label`
  color: white;
  display: block;
`;

const StyledModalInput = styled(StyledInput)`
  width: 70%;
  margin: 1rem auto;
  ${({ theme }) => theme.media.phone} {
    width: 100%;
  }
`;

const StyledTextarea = styled.textarea`
  background-color: lightgray;
  border: none;
  border-radius: 20px;
  width: 70%;
  height: 50%;
  margin: 1rem auto;
  float: left;
  text-align: center;

  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1.2rem;
  }
  ${({ theme }) => theme.media.phone} {
    width: 100%;
  }
`;

const StyledForm = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 90%;
  margin-top: auto;
`;

class AddTask extends Component {
  state = {
    title: '',
    content: '',
    deadline: '',
    created: '',
    completed: false,
  };

  putDataInDatabase = () => {
    const { addNewNote, addNewTask, toggleModalOpen, pageContext } = this.props;
    const { title, content, deadline, created, completed } = this.state;

    if (pageContext === 'todos') {
      addNewTask({ title, deadline, completed });
      console.log('z form TODOS', pageContext);
    }
    if (pageContext === 'notes') {
      addNewNote({ title, content, created });
      console.log('z form NOTES', pageContext);
    }
    toggleModalOpen();
    this.setState({
      title: '',
      content: '',
      deadline: '',
      created: '',
    });
  };

  handleOnAddClick = e => {
    e.preventDefault();
    if (!this.state.title) {
      return alert('Please add new task or quit!');
    }
    this.putDataInDatabase();
  };

  onEnterSave = e => {
    if (e.key === 'Enter') {
      this.handleOnAddClick(e);
    }
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onQuit = () => {
    this.props.toggleModalOpen();
  };

  getCreationDate = () =>
    `Created: ${new Date().getDate()} . ${new Date().getMonth() + 1} . ${new Date().getFullYear()}`;

  render() {
    const { pageContext } = this.props;
    return (
      <StyledForm>
        {pageContext === 'todos' && <StyledLabel htmlFor="newTask">Add new task:</StyledLabel>}
        {pageContext === 'notes' && <StyledLabel htmlFor="newNote">Add new note:</StyledLabel>}

        <StyledModalInput
          name="title"
          placeholder={pageContext === 'todos' ? 'new task' : 'note title'}
          value={this.state.title}
          onChange={this.handleOnChange}
          onKeyDown={this.onEnterSave}
        ></StyledModalInput>

        {pageContext === 'notes' && (
          <StyledTextarea
            name="content"
            placeholder="note content"
            value={this.state.content}
            onChange={this.handleOnChange}
            onKeyDown={this.onEnterSave}
          ></StyledTextarea>
        )}

        {pageContext === 'todos' && (
          <StyledModalInput
            // deadline
            name="deadline"
            placeholder="new deadline"
            value={this.state.deadline}
            onChange={this.handleOnChange}
            onKeyDown={this.onEnterSave}
          ></StyledModalInput>
        )}
        {pageContext === 'notes' && <h2>{this.getCreationDate()}</h2>}

        <StyledButtonWrapper>
          <StyledButton modal="true" type="submit" onClick={this.handleOnAddClick}>
            <FontAwesomeIcon icon={faPlus} />
          </StyledButton>
          <StyledButton onClick={this.onQuit}>
            <FontAwesomeIcon icon={faUndo} color="red" />
          </StyledButton>
        </StyledButtonWrapper>
      </StyledForm>
    );
  }
}

const mapDispatchToProps = {
  addNewTask,
  toggleModalOpen,
  addNewNote,
};
export default withContext(connect(null, mapDispatchToProps)(AddTask));
