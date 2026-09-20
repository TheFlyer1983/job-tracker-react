import { useState, useCallback } from 'react';
import { NotificationContext } from '../contexts/NotificationsContext';
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export type AppNotification = {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  autoClose?: boolean;
  duration?: number;
};

export type NewNotification = Omit<AppNotification, 'id'>;

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const addNotification = useCallback((notification: NewNotification) => {
    setNotifications((currentNotifications) => [
      ...currentNotifications,
      { ...notification, id: crypto.randomUUID() }
    ]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notification) => notification.id !== id)
    );
  }, []);
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
