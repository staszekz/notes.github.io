import { Title, Button, Flex ,Paper, rem} from '@mantine/core';
import { RoutesDef } from '@notes/utils';
import { Link } from '@tanstack/react-router';
import { IconMailCheck } from '@tabler/icons-react';

export function VerifyEmail() {
  return (
    <Paper  shadow="sm" p="xl" w='fit-content' bg={'var(--dark-bg-color)'} maw={'600px'}m="40px auto" >
    <Flex direction={'column'} align={'center'} >
    <IconMailCheck color={'var(--primary)'}     style={{ width: rem(40), height: rem(40) }}/>
      <Title order={2} c={'var(--white'} mb={'xl'}>
        Please check your e-mail.
      </Title>
      <Title order={3} c={'var(--white'} mb={'xl'}>
        We have sent you a verification link. Please click on it to verify your e-mail.
      </Title>
      <Button component={Link} variant="notes-transparent-border" size="md" fz={'md'} to={RoutesDef.SIGNIN}>
        Go to Sign In{' '}
      </Button>
    </Flex>
    </Paper>
  );
}
