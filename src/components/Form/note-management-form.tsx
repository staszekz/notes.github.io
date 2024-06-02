import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import dayjs from 'dayjs';
import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-form-adapter';

import { useRemoteData } from '@notes/hooks';
import { Button, TextInput, Textarea } from '@mantine/core';
import { modals } from '@mantine/modals';
import { CollectionType, Note, RemoteNote } from '@notes/types';

export const NoteManagementForm = ({ data, editNote }: { data: RemoteNote; editNote }) => {
  const { addElement } = useRemoteData<Note, RemoteNote>({ key: CollectionType.NOTES });

  const { Field, Subscribe, handleSubmit, state, useStore } = useForm({
    defaultValues: data
      ? data
      : {
          title: '',
          content: '',
          created: dayjs().format('YYYY-MM-DD-HH:mm')
        },
    validatorAdapter: zodValidator,
    onSubmit: async ({ value }) => {
      data ? editNote({ element: { ...value, id: data.id } }) : addElement.mutate({ element: value });
      modals.closeAll();
    }
  });
  return (
    <form
      className="form-wrapper"
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
            required_error: 'Title is required'
          }),
          onSubmit: z
            .string()
            .trim()
            .min(3, {
              message: 'Title must be at least 3 characters'
            })
            .max(50, {
              message: 'Title must be at most 50 characters'
            })
        }}
        children={({ state, handleChange, handleBlur }) => {
          return (
            <TextInput
              data-autofocus
              size="xl"
              defaultValue={state.value}
              onChange={e => handleChange(e.target.value)}
              onBlur={handleBlur}
              withAsterisk
              label="Note title"
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
            required_error: 'Content is required'
          }),
          onSubmit: z
            .string()
            .trim()
            .min(10, {
              message: 'Title must be at least 10 characters'
            })
            .max(255, {
              message: 'Title must be at most 255 characters'
            })
        }}
        children={({ state, handleChange, handleBlur }) => {
          return (
            <Textarea
              autosize
              size="xl"
              minRows={4}
              label="Note details"
              defaultValue={state.value}
              onChange={e => handleChange(e.target.value)}
              onBlur={handleBlur}
              withAsterisk
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
    </form>
  );
};