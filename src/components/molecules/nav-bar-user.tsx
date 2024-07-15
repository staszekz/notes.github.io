import { Title } from '@notes/components';
import { Stack, Text } from '@mantine/core';
import { User } from 'firebase/auth';

export const NavBarUser = ({ user }: { user: User }) => {
  return (
    <Stack>
      <Title ta="left" c={'var(--primary)'}>
        hello {user?.providerData?.[0]?.displayName}
      </Title>
      <Text c={'var(--primary)'} mt={-10}>
        Nice to see you again!
        {/* Last logged in: <br /> */}
        {/* {user.metadata.lastSignInTime}{' '} */}
      </Text>
    </Stack>
  );
};
