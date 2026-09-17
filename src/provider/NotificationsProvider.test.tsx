import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { NotificationProvider } from './NotificationProvider';
import { useNotifications } from '../hooks/useNotifications';
import type { AppNotification } from './NotificationProvider';
import { userEvent } from '@testing-library/user-event';

const mockNotifications: Omit<AppNotification, 'id'>[] = [
  {
    type: 'success',
    title: 'Success',
    message: 'Success messsage'
  }
];

function TestConsumer() {
  const { notifications, addNotification, removeNotification } = useNotifications();

  return (
    <div>
      <div>{notifications.length} notifications</div>;
      {notifications.map((notification) => (
        <div key={notification.id}>
          <div>{notification.title}</div>

          <button onClick={() => removeNotification(notification.id)}>Remove Notification</button>
        </div>
      ))}
      <button
        onClick={() => {
          addNotification(mockNotifications[0]);
        }}
      >
        Add Notification
      </button>
    </div>
  );
}

describe('NotificationsProvider', () => {
  it('should have no notifications initially', () => {
    render(
      <NotificationProvider>
        <TestConsumer />
      </NotificationProvider>
    );

    expect(screen.getByText('0 notifications')).toBeInTheDocument();
  });

  it('should add a notification', async () => {
    const user = userEvent.setup();
    render(
      <NotificationProvider>
        <TestConsumer />
      </NotificationProvider>
    );

    await user.click(screen.getByText('Add Notification'));

    expect(screen.getByText('1 notifications')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('should add multiple notifications', async () => {
    const user = userEvent.setup();
    render(
      <NotificationProvider>
        <TestConsumer />
      </NotificationProvider>
    );

    await user.click(screen.getByText('Add Notification'));
    await user.click(screen.getByText('Add Notification'));

    expect(screen.getByText('2 notifications')).toBeInTheDocument();
  });

  it('should remove a notification', async () => {
    const user = userEvent.setup();
    render(
      <NotificationProvider>
        <TestConsumer />
      </NotificationProvider>
    );

    await user.click(screen.getByText('Add Notification'));
    expect(screen.getByText('1 notifications')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();

    await user.click(screen.getByText('Remove Notification'));
    expect(screen.getByText('0 notifications')).toBeInTheDocument();
    expect(screen.queryByText('Success')).not.toBeInTheDocument();
  });
});
