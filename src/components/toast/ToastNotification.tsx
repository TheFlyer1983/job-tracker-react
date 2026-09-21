import type { AppNotification } from '../../provider/NotificationProvider';
import { useEffect } from 'react';

const typeClasses = {
  error: 'bg-red-500 text-white',
  success: 'bg-green-500 text-white',
  info: 'bg-blue-500 text-white',
  warning: 'bg-yellow-500 text-white'
};

type ToastNotificationProps = {
  notification: AppNotification;
  removeNotification: (id: string) => void;
};

export default function ToastNotification({
  notification,
  removeNotification
}: ToastNotificationProps) {
  useEffect(() => {
    if (!notification.autoClose) return;

    const timer = setTimeout(() => {
      removeNotification(notification.id);
    }, notification.duration || 5000);

    return () => clearTimeout(timer);
  }, [notification.id, removeNotification, notification.autoClose, notification.duration]);

  return (
    <div
      role={notification.type === 'error' ? 'alert' : 'status'}
      className={`${typeClasses[notification.type]} mb-4 flex w-full flex-col rounded-md p-4`}
    >
      {notification.title && <strong className="block">{notification.title}</strong>}

      <div className="flex items-center justify-between">
        <span>{notification.message}</span>

        <button onClick={() => removeNotification(notification.id)} className="text-white" aria-label="Close notification">
          <span className="h-4 w-4 cursor-pointer">x</span>
        </button>
      </div>
    </div>
  );
}
