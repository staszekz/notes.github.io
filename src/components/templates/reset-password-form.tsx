import { useAuthContext } from '@notes/hooks';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, Flex, TextInput, Title } from '@mantine/core';
import { IconLogin2 } from '@tabler/icons-react';
import { z } from 'zod';
import classes from '../../styles/auth.module.css';

export function ResetPasswordForm({ onSubmit }: { onSubmit?: () => void }) {
  const { resetPassword } = useAuthContext();
  const { Field, Subscribe, handleSubmit, state } = useForm({
    defaultValues: { email: '' },
    validatorAdapter: zodValidator(),
    onSubmit: async () => {
      resetPassword(state.values.email);
      onSubmit?.();
    }
  });

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        e.stopPropagation();
        await handleSubmit();
      }}
    >
      <Title order={2} mb={'xl'}>
        Please provide your e-mail.
      </Title>
      <Field
        name="email"
        validators={{
          onSubmit: z.string().email('Invalid e-mail').trim(),
          onBlur: z.string().email('Invalid e-mail')
        }}
        children={({ state, handleChange, handleBlur }) => {
          return (
            <TextInput
              className={classes.textInput}
              data-autofocus
              size="md"
              defaultValue={state.value}
              onChange={e => handleChange(e.target.value)}
              onBlur={handleBlur}
              withAsterisk
              label="E-mail"
              placeholder="Enter e-mail address"
              error={state.meta?.errors[0]}
            />
          );
        }}
      />
      <Flex justify={'flex-end'} mt={5} align={'center'}>
        <Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => {
            return (
              <Button
                size="medium"
                right={0}
                type="submit"
                variant="notes-transparent-border"
                loading={isSubmitting}
                disabled={!canSubmit}
                loaderProps={{ color: 'var(--white)', size: 20 }}
              >
                <IconLogin2 stroke={1.5} />
              </Button>
            );
          }}
        />
      </Flex>
    </form>
  );
}
