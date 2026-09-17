import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';
import ToastNotification from './ToastNotification';
import { MemoryRouter } from 'react-router';
import { userEvent } from '@testing-library/user-event';

const { mockRemoveNotification } = vi.hoisted(() => ({
  mockRemoveNotification: vi.fn()
}));

vi.mock('../../hooks/useNotifications', () => ({
  useNotifications: () => ({
    removeNotification: mockRemoveNotification
  })
}));

const renderToastNotification = (autoClose = false, duration = 5000) => {
  return render(
    <MemoryRouter>
      <ToastNotification
        notification={{
          id: '1',
          type: 'success',
          title: 'Success',
          message: 'Success message',
          autoClose,
          duration
        }}
        removeNotification={mockRemoveNotification}
      />
    </MemoryRouter>
  );
};

describe('ToastNotification', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render the notification', () => {
    renderToastNotification();

    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('should render not remove the notification if autoClose is false', () => {
    vi.useFakeTimers();
    renderToastNotification();

    vi.advanceTimersByTime(5000);

    expect(mockRemoveNotification).not.toHaveBeenCalled();
  });

  it('should remove the notification if autoClose is true', () => {
    vi.useFakeTimers();
    renderToastNotification(true);

    vi.advanceTimersByTime(5000);

    expect(mockRemoveNotification).toHaveBeenCalled();
  });

  it('a custom duration should be used if provided', () => {
    vi.useFakeTimers();
    renderToastNotification(true, 1000);

    vi.advanceTimersByTime(1000);

    expect(mockRemoveNotification).toHaveBeenCalledWith('1');
  });

  it('should call removeNotification when the close button is clicked', async () => {
    renderToastNotification();

    const closeButton = screen.getByRole('button', { name: 'Close notification' });

    await userEvent.click(closeButton);

    expect(mockRemoveNotification).toHaveBeenCalledWith('1');
  });
});
