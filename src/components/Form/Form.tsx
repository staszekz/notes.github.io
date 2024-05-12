import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  StyledButton,
  StyledModalInput,
  StyledTextarea,
  StyledButtonWrapper,
} from '@notes/components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUndo } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import { StyledLabel, StyledForm, StyledDate } from './styled';
import { usePageTypeContext } from '@notes/hooks';
import { RootState, addNewTask, addNewNote, toggleModalOpen } from '@notes/redux';

type AddTaskComponentProps = {
  addNewNote: any;
  addNewTask: any;
  toggleModalOpen: any;
  created: string;
  onAdd: any;
};

const AddTaskComponent = ({
  addNewNote,
  addNewTask,
  toggleModalOpen,
  created,
  onAdd,
}: AddTaskComponentProps) => {
  const initialState = {
    title: '',
    content: '',
    deadline: '',
    completed: false,
  };
  const pageContext = usePageTypeContext();

  const [state, setState] = useState(initialState);
  const { title, content, deadline, completed } = state;

  const putDataInDatabase = () => {
    if (pageContext === 'todos') {
      addNewTask({ title, deadline, completed });
    }
    if (pageContext === 'notes') {
      addNewNote({ title, content, created });
    }
    toggleModalOpen();
    setState({
      ...initialState,
    });
  };

  const handleOnAddClick = e => {
    e.preventDefault();
    if (!title) {
      return alert(`Please add new ${pageContext === 'todos' ? 'task' : 'note'} or quit!`);
    }
    putDataInDatabase();
  };

  const onEnterSave = e => {
    if (e.key === 'Enter') {
      handleOnAddClick(e);
    }
  };

  const handleOnChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onQuit = () => {
    toggleModalOpen();
    setState({
      ...initialState,
    });
  };

  return (
    <StyledForm>
      <StyledLabel htmlFor="title">
        {`Add new ${pageContext === 'todos' ? 'task' : 'note'}`}
      </StyledLabel>
      <StyledModalInput
        name="title"
        placeholder={pageContext === 'todos' ? 'new task' : 'note title'}
        value={title}
        onChange={handleOnChange}
        onKeyDown={onEnterSave}
      ></StyledModalInput>
      {pageContext === 'notes' && (
        <StyledTextarea
          name="content"
          placeholder="note content"
          value={state.content}
          onChange={handleOnChange}
          onKeyDown={onEnterSave}
        ></StyledTextarea>
      )}
      {pageContext === 'todos' && (
        <StyledModalInput
          name="deadline"
          placeholder="new deadline"
          value={state.deadline}
          onChange={handleOnChange}
          onKeyDown={onEnterSave}
        ></StyledModalInput>
      )}
      {pageContext === 'notes' && (
        <StyledDate data-tip data-for="created">
          {created}
        </StyledDate>
      )}
      <StyledButtonWrapper>
        <StyledButton
          modal="true"
          type="submit"
          onClick={handleOnAddClick}
          data-tip
          data-for="addItem"
        >
          <FontAwesomeIcon icon={faPlus} />
        </StyledButton>
        <StyledButton onClick={onQuit} data-tip data-for="quit">
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
};

const mapStateToProps = (state: RootState) => ({
  created: state.modalReducer.createdDate,
});

const mapDispatchToProps = {
  addNewTask,
  toggleModalOpen,
  addNewNote,
};
export const AddTask = connect(mapStateToProps, mapDispatchToProps)(AddTaskComponent);
