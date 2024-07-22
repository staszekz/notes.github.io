import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useRemoteData } from '@notes/hooks';
import { Button, TextInput, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { modals } from '@mantine/modals';
import { CollectionType, Todo, TodoWithId } from '@notes/types';
import { Timestamp } from 'firebase/firestore';
import { removeId } from '@notes/utils';
import classes from './styles.module.css';

export const TodoManagementForm = ({ data }: { data?: TodoWithId }) => {
  const { addElement, editElement } = useRemoteData<Todo>({ key: CollectionType.TODOS });

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: data
      ? removeId<TodoWithId>(data)
      : {
          title: '',
          extraContent: '',
          deadline: null,
          completed: false,
          createdOn: Timestamp.now()
        },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      data ? editElement.mutate({ element: value, id: data.id }) : addElement.mutate(value);
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
              value={state.value}
              onChange={e => handleChange(e.target.value)}
              onBlur={handleBlur}
              withAsterisk
              label="Todo title"
              placeholder="Enter todo title"
              error={state.meta?.errors[0]}
            />
          );
        }}
      />
      <Field
        name="deadline"
        validators={{
          onSubmit: z
            .object({
              seconds: z.number().optional(),
              nanoseconds: z.number().optional()
            })
            .optional()
        }}
        children={({ state, handleChange, handleBlur }) => {
          return (
            <DateTimePicker
              size="xl"
              value={state.value?.toDate()}
              label="Todo deadline"
              minDate={new Date()}
              onBlur={handleBlur}
              onChange={e => {
                const timestamp = Timestamp.fromDate(e as Date);
                handleChange(timestamp);
              }}
              placeholder="Enter todo deadline date"
              error={state.meta?.errors[0]}
            />
          );
        }}
      />
      <Field
        name="extraContent"
        validators={{
          onSubmit: z.string().optional(),
          onChange: z
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
              label="Todo details"
              value={state.value}
              onChange={e => handleChange(e.target.value)}
              onBlur={handleBlur}
              placeholder="Enter todo content"
              error={state.meta?.errors[0]}
            />
          );
        }}
      />
      <Subscribe
        selector={state => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button size="sm" type="submit" fz="1rem" variant="notes-transparent-border" disabled={!canSubmit}>
            {isSubmitting ? '...' : 'Submit'}
          </Button>
        )}
      />
    </form>
  );
};
