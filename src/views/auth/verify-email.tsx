import { Title, Button, Flex } from '@mantine/core';
import { RoutesDef } from '@notes/utils';
import { Link } from '@tanstack/react-router';

export function VerifyEmail() {
  return (
    <Flex direction={'column'} w={'fit-content'} m="0 auto">
      <Title order={1} c="white" mb={'xl'}>
        Please check your e-mail to verify your account.
      </Title>
      <Button component={Link} variant="notes-transparent-border" size="md" fz={'md'} to={RoutesDef.SIGNIN}>
        Go to Sign In{' '}
      </Button>
    </Flex>
  );
}
