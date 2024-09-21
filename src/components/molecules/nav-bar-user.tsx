import { Avatar, Group, Menu, Title, Text, Anchor, Button } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { RoutesDef } from '@notes/utils';
import { IconLogout } from '@tabler/icons-react';
import { useAuthContext } from '@notes/hooks';

export const NavBarUser = () => {
  const { user, signUserOut } = useAuthContext();
  const handleSignOutClick = () => {
    signUserOut();
  };
  return (
    <Button
      variant="invisible"
      component={Menu}
      withinPortal={false}
      trigger="click-hover"
      openDelay={100}
      closeDelay={400}
    >
      <Menu.Target>
        <Group>
          <Avatar
            src={'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'} // TODO: change with custom user photo and default to some avatar
            radius="xl"
          />
          <div>
            <Title size={'h4'}>Hello, {user?.providerData?.[0]?.displayName}!</Title>
            <Text c="dimmed" size="xs">
              Nice to see you !
            </Text>
          </div>
        </Group>
      </Menu.Target>
      <Menu.Dropdown c="var(--primary)">
        <Menu.Item>
          <Text component={Link} to={RoutesDef.SETTINGS} c="var(--secondary)">
            Settings
          </Text>
        </Menu.Item>
        <Menu.Item>
          <Text component={Link} to={RoutesDef.PROFILE} c="var(--secondary)">
            My Profile
          </Text>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={handleSignOutClick} leftSection={<IconLogout stroke={1} />}>
          <Anchor underline="never" component={Link} to={RoutesDef.LOGIN} c="black">
            log out
          </Anchor>
        </Menu.Item>
      </Menu.Dropdown>
    </Button>
  );
};
