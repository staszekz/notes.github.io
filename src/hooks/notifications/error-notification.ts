import { notifications } from '@mantine/notifications';

export const errorNotification = ({ message }: { message: string }) => {
  notifications.show({
    title: 'An error occured',
    message:
      message || 'There has been an error while updating the todo, please try again later or contact the administrator',
    color: 'red',
    position: 'top-center',
    autoClose: 5000,
    withCloseButton: true
  });
};
