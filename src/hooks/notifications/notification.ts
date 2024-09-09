import { notifications } from '@mantine/notifications'
import classes from './styles.module.css';
console.log('🚀 ~ classes:', classes)

export const customNotification = () => {
  notifications.show({
    title: 'An error occured',
    message: 'There has been an error while updating the todo, please try again later or contact the administrator',
    color: 'red',
    position: 'top-right',
    autoClose: 5000,
    radius: "md",
    // classNames: classes,
    withCloseButton: true,
  })
}