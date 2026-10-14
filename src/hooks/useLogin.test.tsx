import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useLogin } from './useLogin';

const { mockLogin, mockAddNotification } = vi.hoisted(() => ({
  mockLogin: vi.fn(),
  mockAddNotification: vi.fn()
}));

vi.mock('@/api/client/auth', () => ({
  login: mockLogin
}));

vi.mock('./useNotifications', () => ({
  useNotifications: () => ({
    addNotification: mockAddNotification
  })
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {
        retry: false
      }
    }
  });

  return {
    queryClient,
    wrapper: function Wrapper({ children }: { children: React.ReactNode }) {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }
  };
}

describe('useLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it(`should call the api login function and invalidate the 'me' query on success`, async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password'
    };

    mockLogin.mockResolvedValue({
      id: 'user-123',
      email: 'test@example.com'
    });

    const { queryClient, wrapper } = createWrapper();

    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(credentials);
    });

    expect(mockLogin.mock.calls[0][0]).toEqual(credentials);
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['me'] });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockAddNotification).not.toHaveBeenCalled();
  });

  it('should show an error notification when the login fails', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'wrong-password'
    };

    mockLogin.mockRejectedValue(new Error('Invalid credentials'));

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      await expect(result.current.mutateAsync(credentials)).rejects.toThrow('Invalid credentials');
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);

      expect(mockAddNotification).toHaveBeenCalledWith({
        type: 'error',
        message: 'Invalid credentials'
      });
    });
  });
});
