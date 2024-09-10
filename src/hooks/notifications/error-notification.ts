import { notifications } from '@mantine/notifications'

export const errorNotification = () => {
  notifications.show({
    title: 'An error occured',
    message: 'There has been an error while updating the todo, please try again later or contact the administrator',
    color: 'red',
    position: 'top-center',
    autoClose: 5000,
    radius: "md",
    withCloseButton: true,
  })
}