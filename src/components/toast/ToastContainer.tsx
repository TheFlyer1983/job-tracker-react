import { useNotifications } from '../../hooks/useNotifications';
import ToastNotification from './ToastNotification';

export default function ToastContainer() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed right-4 bottom-4 w-80">
      {notifications.map((notification) => (
        <ToastNotification
          key={notification.id}
          notification={notification}
          removeNotification={removeNotification}
        />
      ))}
    </div>
  );
}
