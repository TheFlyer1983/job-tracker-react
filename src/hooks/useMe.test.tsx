import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useMe } from './useMe';

const { mockGetMe } = vi.hoisted(() => ({
  mockGetMe: vi.fn()
}));

vi.mock('../api/client/auth', () => ({
  getMe: mockGetMe
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('useMe', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the authenticated user', async () => {
    const user = {
      id: 'user-123',
      email: 'test@example.com'
    };

    mockGetMe.mockResolvedValue(user);

    const { result } = renderHook(() => useMe(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(user);
    });

    expect(mockGetMe).toHaveBeenCalledOnce();
    expect(result.current.isSuccess).toBe(true);
  });

  it('should return an error if the request fails', async () => {
    mockGetMe.mockRejectedValue(new Error('Failed to fetch user'));

    const { result } = renderHook(() => useMe(), {
      wrapper: createWrapper()
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockGetMe).toHaveBeenCalledOnce();
    expect(result.current.error).toEqual(new Error('Failed to fetch user'));
  });

  it('should initially be pending', () => {
    mockGetMe.mockResolvedValue(new Promise(() => {}));

    const { result } = renderHook(() => useMe(), {
      wrapper: createWrapper()
    });

    expect(result.current.isPending).toBe(true);
  });
});
