import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-form-adapter';

import { useAddNote, useUpdateNote } from '@notes/hooks';
import { Button, TextInput, Textarea } from '@mantine/core';
import { modals } from '@mantine/modals';
import { Note } from '@notes/types';
import { Timestamp } from 'firebase/firestore';

export const NoteManagementForm = ({ data }: { data?: Note }) => {
  const { addNote, isNoteAdding } = useAddNote();
  const { updateNote, isNoteUpdating } = useUpdateNote();

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: data
      ? data
      : {
          title: '',
          content: '',
          createdOn: Timestamp.now()
        },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      data ? updateNote({ element: value as Note }) : addNote({ element: value as Omit<Note, 'id>'> });
      modals.closeAll();
    }
  });
  return (
    <form
      className="form-wrapper"
      onSubmit={async e => {
        e.preventDefault();
        e.stopPropagation();
        await handleSubmit();
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
              size="md"
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
              mt="md"
              size="md"
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
          <Button
            size="sm"
            mt="md"
            w="100%"
            type="submit"
            fz="1rem"
            variant="notes-transparent-border"
            disabled={!canSubmit || isNoteAdding || isNoteUpdating}
          >
            {isSubmitting ? '...' : 'Submit'}
          </Button>
        )}
      />
    </form>
  );
};
