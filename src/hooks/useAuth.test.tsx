import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useAuth } from './useAuth';
import { mockLogin } from '../test/auth';

const { mockUseMe, mockUseLogout, mockUseLogin, mockUseRegister } = vi.hoisted(() => ({
  mockUseMe: vi.fn(),
  mockUseLogout: vi.fn(),
  mockUseLogin: vi.fn(),
  mockUseRegister: vi.fn()
}));

vi.mock('./useMe', () => ({
  useMe: mockUseMe
}));

vi.mock('./useLogout', () => ({
  useLogout: mockUseLogout
}));

vi.mock('./useLogin', () => ({
  useLogin: mockUseLogin
}));

vi.mock('./useRegister', () => ({
  useRegister: mockUseRegister
}));

const mockUser = {
  id: 'user-123',
  email: 'test@example.com'
};

const defaultMeState = {
  data: undefined,
  isPending: false
};

const defaultMutationState = {
  mutate: vi.fn(),
  isPending: false,
  isError: false
};

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseMe.mockReturnValue(defaultMeState);
    mockUseLogout.mockReturnValue({ ...defaultMutationState });
    mockUseLogin.mockReturnValue({ ...defaultMutationState });
    mockUseRegister.mockReturnValue({ ...defaultMutationState });
  });

  it('should return an unauthenticated state when no user exists', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeUndefined();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should return the authenticated user when one exists', () => {
    mockUseMe.mockReturnValue({
      data: mockUser,
      isPending: false
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('should return a loading state while checking authentication', () => {
    mockUseMe.mockReturnValue({
      data: undefined,
      isPending: true
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should call the correct mutation functions', () => {
    const mockLoginMutation = vi.fn();
    const mockLogoutMutation = vi.fn();
    const mockRegisterMutation = vi.fn();

    mockUseLogin.mockReturnValue({
      ...defaultMutationState,
      mutate: mockLoginMutation
    });
    mockUseLogout.mockReturnValue({
      ...defaultMutationState,
      mutate: mockLogoutMutation
    });
    mockUseRegister.mockReturnValue({
      ...defaultMutationState,
      mutate: mockRegisterMutation
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.login).toBe(mockLoginMutation);
    expect(result.current.logout).toBe(mockLogoutMutation);
    expect(result.current.register).toBe(mockRegisterMutation);
  });

});
