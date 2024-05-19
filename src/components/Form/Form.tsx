import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from '@tanstack/react-form';
import dayjs from 'dayjs';
import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-form-adapter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUndo } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import { useNotes, usePageTypeContext } from '@notes/hooks';
import { RootState, addNewTask, addNewNote, toggleModalOpen } from '@notes/redux';
import { Button, TextInput, Textarea, Title } from '@mantine/core';
import { StyledForm } from 'src/components/atoms';

type AddTaskComponentProps = {
  addNewNote: any;
  addNewTask: any;
  toggleModalOpen: any;
  created: string;
  onAdd: any;
};

export const AddTask = ({ close }) => {
  const { addNewNote } = useNotes();

  const { Field, Subscribe, handleSubmit, state, useStore } = useForm({
    defaultValues: {
      title: '',
      content: '',
      created: dayjs().format('YYYY-MM-DD-HH:mm'),
    },
    validatorAdapter: zodValidator,
    onSubmit: async ({ value }) => {
      addNewNote.mutate(value);
      close();
    },
  });
  return (
    <StyledForm
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
    >
      <Field
        name="title"
        validators={{
          onBlur: z.string({
            required_error: 'Title is required',
          }),
          onChange: z
            .string()
            .trim()
            .min(3, {
              message: 'Title must be at least 3 characters',
            })
            .max(50, {
              message: 'Title must be at most 50 characters',
            }),
        }}
        children={({ state, handleChange, handleBlur }) => {
          return (
            <TextInput
              data-autofocus
              size="xl"
              defaultValue={state.value}
              onChange={e => handleChange(e.target.value)}
              onBlur={handleBlur}
              placeholder="Enter note title"
              error={state.meta?.errors[0]}
            />
          );
        }}
      />

      <Field
        name="content"
        validators={{
          onBlur: z.string({
            required_error: 'Content is required',
          }),
          onChange: z
            .string()
            .trim()
            .min(10, {
              message: 'Title must be at least 10 characters',
            })
            .max(255, {
              message: 'Title must be at most 255 characters',
            }),
        }}
        children={({ state, handleChange, handleBlur }) => {
          return (
            <Textarea
              size="xl"
              defaultValue={state.value}
              onChange={e => handleChange(e.target.value)}
              onBlur={handleBlur}
              placeholder="Enter note content"
              error={state.meta?.errors[0]}
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
    </StyledForm>
  );
};
