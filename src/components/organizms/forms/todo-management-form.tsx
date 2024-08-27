import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useAddTodo, useUpdateTodo } from '@notes/hooks';
import { Button, TextInput, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { modals } from '@mantine/modals';
import { TodoWithId } from '@notes/types';
import { Timestamp } from 'firebase/firestore';
import { removeId } from '@notes/utils';

export const TodoManagementForm = ({ data }: { data?: TodoWithId }) => {
  const { addTodo, isTodoAdding } = useAddTodo();
  const { updateTodo, isTodoUpdating } = useUpdateTodo();

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: data
      ? removeId<TodoWithId>(data)
      : {
          title: '',
          content: '',
          deadline: null,
          completed: false,
          createdOn: Timestamp.now()
        },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      data ? updateTodo({ element: value, id: data.id }) : addTodo(value);
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
              size="md"
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
              size="md"
              value={state.value?.toDate()}
              label="Todo deadline"
              minDate={new Date()}
              mt="md"
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
        name="content"
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
              mt="md"
              size="md"
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
          <Button
            size="sm"
            mt="md"
            w="100%"
            type="submit"
            fz="1rem"
            variant="notes-transparent-border"
            disabled={!canSubmit || isTodoAdding || isTodoUpdating}
          >
            {isSubmitting ? '...' : 'Submit'}
          </Button>
        )}
      />
    </form>
  );
};
