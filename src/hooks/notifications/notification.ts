import { notifications } from '@mantine/notifications';


export const notification = ({ message, type, title }: { message: string, type: 'error' | 'success' | 'info' | 'warning', title: string }) => {

  notifications.show({
    title,
    message,
    // color: color[type],
    // icon: 'error',
    position: 'top-center',
    autoClose: 5000,
    withCloseButton: true
  });
};

const color = {
  error: `var(--red)`,
  success: 'var(--success)',
  warning: 'var(---warning)',
  info: 'var(--primary)'
}
