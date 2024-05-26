import { useForm } from '@tanstack/react-form';
import dayjs from 'dayjs';
import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useRemoteData } from '@notes/hooks';
import { Button, TextInput, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { StyledForm } from 'src/components/atoms';
import { modals } from '@mantine/modals';
import { CollectionType, RemoteTodo, Todo } from '@notes/types';

export const TodoManagementForm = ({ data, editNote }: { data: RemoteTodo; editNote }) => {
  console.log('🚀 ~ data:', data);

  const { addElement } = useRemoteData<Todo, RemoteTodo>({ key: CollectionType.TODOS });

  const { Field, Subscribe, handleSubmit, state, useStore } = useForm<RemoteTodo>({
    defaultValues: data
      ? data
      : {
          title: '',
          extraContent: '',
          deadline: '',
          completed: false,
          created: dayjs().format('YYYY-MM-DD-HH:mm')
        },
    validatorAdapter: zodValidator,
    onSubmit: async ({ value }) => {
      data ? editNote({ element: { ...value, id: data.id } }) : addElement.mutate({ element: value });
      modals.closeAll();
    }
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
          onSubmit: z.string()
        }}
        children={({ state, handleChange, handleBlur }) => {
          console.log('🚀 ~ state:', state);

          return (
            <DateInput
              autosize
              size="xl"
              minRows={4}
              value={new Date(state.value)}
              label="Todo deadline"
              minDate={new Date()}
              onBlur={handleBlur}
              onChange={e => {
                console.log(e);
                handleChange(dayjs(e).format('YYYY-MM-DD'));
              }}
              withAsterisk
              placeholder="Enter todo deadline date"
              error={state.meta?.errors[0]}
            />
          );
        }}
      />
      <Field
        name="extraContent"
        validators={{
          onSubmit: z
            .string()
            .trim()
            .min(10, {
              message: 'Title must be at least 10 characters'
            })
            .max(255, {
              message: 'Title must be at most 255 characters'
            })
            .optional()
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
              withAsterisk
              placeholder="Enter todo content"
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
    </StyledForm>
  );
};
