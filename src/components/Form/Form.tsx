import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from '@tanstack/react-form';
import dayjs from 'dayjs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUndo } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import { useNotes, usePageTypeContext } from '@notes/hooks';
import { RootState, addNewTask, addNewNote, toggleModalOpen } from '@notes/redux';
import { Button, TextInput, Textarea, Title } from '@mantine/core';

type AddTaskComponentProps = {
  addNewNote: any;
  addNewTask: any;
  toggleModalOpen: any;
  created: string;
  onAdd: any;
};

const AddTaskComponent = ({ close }) => {
  const initialState = {
    title: '',
    content: '',
    deadline: '',
    completed: false,
  };
  const { addNewNote } = useNotes();

  const { Field, Subscribe, handleSubmit, state, useStore } = useForm({
    defaultValues: {
      title: '',
      content: '',
      created: dayjs().format('YYYY-MM-DD-HH:mm'),
    },
    onSubmit: async ({ value }) => {
      console.log('value: ', value);
      addNewNote.mutate(value);
      close();
    },
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
    >
      <Field
        name="title"
        children={({ state, handleChange, handleBlur }) => {
          return (
            <TextInput
              size="xl"
              defaultValue={state.value}
              onChange={e => handleChange(e.target.value)}
              onBlur={handleBlur}
              placeholder="Enter note title"
            />
          );
        }}
      />
      <Field
        name="content"
        children={({ state, handleChange, handleBlur }) => {
          return (
            <Textarea
              size="xl"
              defaultValue={state.value}
              onChange={e => handleChange(e.target.value)}
              onBlur={handleBlur}
              placeholder="Enter note content"
            />
          );
        }}
      />
      <Subscribe
        selector={state => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <>
            <Button size="lg" type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Submit'}
            </Button>
          </>
        )}
      />
      {/* <StyledModalInput
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
      </StyledButtonWrapper> */}

      <ReactTooltip id="quit" place="top" effect="solid">
        Quit without saving
      </ReactTooltip>
      <ReactTooltip id="created" place="top" effect="solid">
        Creation date
      </ReactTooltip>
    </form>
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
