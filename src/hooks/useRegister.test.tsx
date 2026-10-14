import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useRegister } from './useRegister';

const { mockRegister, mockAddNotification } = vi.hoisted(() => ({
  mockRegister: vi.fn(),
  mockAddNotification: vi.fn()
}));

vi.mock('@/api/client/auth', () => ({
  register: mockRegister
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

describe('useRegister', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it(`should call the api register function and invalidate the 'me' query on success`, async () => {
    const user = {
      email: 'test@example.com',
      password: 'password'
    };

    mockRegister.mockResolvedValue({
      id: 'user-123',
      email: 'test@example.com'
    });

    const { queryClient, wrapper } = createWrapper();

    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useRegister(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(user);
    });

    expect(mockRegister.mock.calls[0][0]).toEqual(user);
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['me'] });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(mockAddNotification).not.toHaveBeenCalled();
  });

  it('should show an error notification when the register fails', async () => {
    const user = {
      email: 'test@example.com',
      password: 'password'
    };

    mockRegister.mockRejectedValue(new Error('Invalid credentials'));

    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useRegister(), { wrapper });

    await act(async () => {
      await expect(result.current.mutateAsync(user)).rejects.toThrow('Invalid credentials');
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
