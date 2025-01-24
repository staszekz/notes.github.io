import { createLazyFileRoute } from '@tanstack/react-router';
import { Flex, Paper, rem, Title } from '@mantine/core';
import { ButtonLink, ResetPasswordForm } from '@notes/components';
import { IconMailCheck } from '@tabler/icons-react';
import { useState } from 'react';

export const Route = createLazyFileRoute('/reset-password')({
  component: ResetPassword
});

function ResetPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <Paper shadow="sm" p="xl" w="fit-content" bg={'var(--dark-bg-color)'} maw={'600px'} m="40px auto">
      <Flex direction={'column'} align={'center'}>
        <IconMailCheck color={'var(--primary)'} style={{ width: rem(40), height: rem(40) }} />
        <br />
        {isSubmitted ? (
          <Title order={3} c={'var(--white)'} mb={'xl'}>
            We have sent you a verification link to provided e-mail. Please click on it to reset your password.
          </Title>
        ) : (
          <ResetPasswordForm onSubmit={() => setIsSubmitted(true)} />
        )}

        <br />
        <ButtonLink variant="notes-transparent-border" size="md" fz={'md'} to={'/signin'}>
          Go to Sign In{' '}
        </ButtonLink>
      </Flex>
    </Paper>
  );
}
