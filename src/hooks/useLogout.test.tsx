import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useLogout } from './useLogout';

const { mockLogout, mockAddNotification } = vi.hoisted(() => ({
  mockLogout: vi.fn(),
  mockAddNotification: vi.fn()
}));

vi.mock('@/api/client/auth', () => ({
  logout: mockLogout
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

describe('useLogout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it(`should call the api logout function and removing the 'me' and 'jobs' queries on success`, async () => {
    const { queryClient, wrapper } = createWrapper();

    const removeSpy = vi.spyOn(queryClient, 'removeQueries');

    const { result } = renderHook(() => useLogout(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync();
    });

    expect(mockLogout).toHaveBeenCalledOnce();
    expect(removeSpy).toHaveBeenCalledWith({ queryKey: ['me'] });
    expect(removeSpy).toHaveBeenCalledWith({ queryKey: ['jobs'] });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(mockAddNotification).not.toHaveBeenCalled();
  });

  it('should show an error notification when the logout fails', async () => {
    mockLogout.mockRejectedValue(new Error('Logout failed'));
    const { queryClient, wrapper } = createWrapper();

    const removeSpy = vi.spyOn(queryClient, 'removeQueries');

    const { result } = renderHook(() => useLogout(), { wrapper });

    await act(async () => {
      await expect(result.current.mutateAsync()).rejects.toThrow('Logout failed');
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(mockAddNotification).toHaveBeenCalledWith({
        type: 'error',
        message: 'Logout failed'
      });
      expect(removeSpy).not.toHaveBeenCalled();
    });
  });
});
