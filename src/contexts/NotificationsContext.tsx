import { createContext } from 'react';
import type { AppNotification, NewNotification } from '../provider/NotificationProvider';

type NotificationContextType = {
  notifications: AppNotification[];
  addNotification: (notification: NewNotification) => void;
  removeNotification: (id: string) => void;
};

export const NotificationContext = createContext<NotificationContextType | null>(null);