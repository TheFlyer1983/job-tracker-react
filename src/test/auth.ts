import { vi } from 'vitest';

export const mockLogin = vi.fn();
export const mockLogout = vi.fn();
export const mockRegister = vi.fn();

export const defaultAuthState = {
  user: undefined,
  isLoading: false,
  isAuthenticated: false,
  login: mockLogin,
  isLoggingIn: false,
  isLoginError: false,
  logout: mockLogout,
  isLoggingOut: false,
  register: mockRegister,
  isRegistering: false,
  isRegisterError: false
};