import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { StyledInput } from 'components/Todo/TodoInput';
import { StyledButton } from 'components/Button/Button';
import { addNewTask } from 'reducers/todosReducer';
import { toggleModalOpen } from 'reducers/modalReducer';
import { addNewNote } from 'reducers/notesReducer';
import withContext from 'components/context/withContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUndo } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

const StyledLabel = styled.label`
  color: white;
  display: block;
`;

export const StyledModalInput = styled(StyledInput)`
  width: 70%;
  margin: 1rem auto;
  ${({ theme }) => theme.media.phone} {
    width: 100%;
  }
  ${({ notes }) =>
    notes &&
    css`
      width: 90%;
    `}
`;

export const StyledTextarea = styled.textarea`
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
  ${({ notes }) =>
    notes &&
    css`
      width: 90%;
      height: 70%;
    `}
`;

const StyledForm = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 90%;
  margin-top: auto;
`;

const StyledDate = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
`;

class AddTask extends Component {
  state = {
    title: '',
    content: '',
    deadline: '',
    completed: false,
  };

  putDataInDatabase = () => {
    const { addNewNote, addNewTask, toggleModalOpen, pageContext, created } = this.props;
    const { title, content, deadline, completed } = this.state;

    if (pageContext === 'todos') {
      addNewTask({ title, deadline, completed });
    }
    if (pageContext === 'notes') {
      addNewNote({ title, content, created });
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
      return alert(
        `Please add new ${this.props.pageContext === 'todos' ? 'task' : 'note'} or quit!`,
      );
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
    this.setState({
      title: '',
      content: '',
      deadline: '',
      created: '',
    });
  };

  render() {
    const { pageContext } = this.props;
    return (
      <StyledForm>
        <StyledLabel htmlFor="title">
          {`Add new ${pageContext === 'todos' ? 'task' : 'note'}`}
        </StyledLabel>
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
            name="deadline"
            placeholder="new deadline"
            value={this.state.deadline}
            onChange={this.handleOnChange}
            onKeyDown={this.onEnterSave}
          ></StyledModalInput>
        )}
        {pageContext === 'notes' && (
          <StyledDate data-tip data-for="created">
            {this.props.created}
          </StyledDate>
        )}
        <StyledButtonWrapper>
          <StyledButton
            modal="true"
            type="submit"
            onClick={this.handleOnAddClick}
            data-tip
            data-for="addItem"
          >
            <FontAwesomeIcon icon={faPlus} />
          </StyledButton>
          <StyledButton onClick={this.onQuit} data-tip data-for="quit">
            <FontAwesomeIcon icon={faUndo} color="red" />
          </StyledButton>
        </StyledButtonWrapper>
        <ReactTooltip id="addItem" place="top" effect="solid">
          {`Add ${pageContext === 'todos' ? 'task' : 'note'}`}
        </ReactTooltip>
        <ReactTooltip id="quit" place="top" effect="solid">
          Quit without saving
        </ReactTooltip>
        <ReactTooltip id="created" place="top" effect="solid">
          Creation date
        </ReactTooltip>
      </StyledForm>
    );
  }
}

const mapStateToProps = state => ({
  created: state.modalReducer.createdDate,
});

const mapDispatchToProps = {
  addNewTask,
  toggleModalOpen,
  addNewNote,
};
export default withContext(connect(mapStateToProps, mapDispatchToProps)(AddTask));
