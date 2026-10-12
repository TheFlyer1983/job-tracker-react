import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { axe } from 'vitest-axe';

import AppHeader from './AppHeader';

const mockedAuthState = vi.hoisted(() => ({
  mockedIsLoading: false,
  mockedIsAuthenticated: false,
  mockedLogout: vi.fn(),
  mockedIsLoggingOut: false,
  mockedUser: { id: 'user-123', email: 'test@example.com' },
  mockedNavigate: vi.fn()
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: mockedAuthState.mockedUser,
    isAuthenticated: mockedAuthState.mockedIsAuthenticated,
    logout: mockedAuthState.mockedLogout,
    isLoggingOut: mockedAuthState.mockedIsLoggingOut
  })
}));

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();

  return {
    ...actual,
    useNavigate: () => mockedAuthState.mockedNavigate
  };
});

const renderAppHeader = () => {
  return render(<AppHeader />, { wrapper: MemoryRouter });
};

describe('AppHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedAuthState.mockedIsAuthenticated = false;
    mockedAuthState.mockedIsLoggingOut = false;
    mockedAuthState.mockedUser.email = 'test@example.com';
  });

  it('should display the brand when the user is unauthenticated', () => {
    renderAppHeader();

    expect(screen.getByText('Job Tracker')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Log out' })).not.toBeInTheDocument();
  });

  it('should display the user email and logout button when the user is authenticated', () => {
    mockedAuthState.mockedIsAuthenticated = true;
    renderAppHeader();

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
  });

  it('should call the logout function when the logout button is clicked', async () => {
    const user = userEvent.setup();
    mockedAuthState.mockedIsAuthenticated = true;
    renderAppHeader();

    await user.click(screen.getByRole('button', { name: 'Log out' }));
    expect(mockedAuthState.mockedLogout).toHaveBeenCalled();
  });

  it('should redirect to the login page when the user is logged out', async () => {
    const user = userEvent.setup();
    mockedAuthState.mockedIsAuthenticated = true;
    mockedAuthState.mockedLogout.mockImplementation((_credentials, options) => {
      options?.onSuccess?.();
    });

    renderAppHeader();

    await user.click(screen.getByRole('button', { name: 'Log out' }));
    expect(mockedAuthState.mockedLogout).toHaveBeenCalled();
    expect(mockedAuthState.mockedLogout).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        onSuccess: expect.any(Function)
      })
    );
    expect(mockedAuthState.mockedNavigate).toHaveBeenCalledWith('/login');
  });

  it('should display the loading state when the user is logging out', () => {
    mockedAuthState.mockedIsAuthenticated = true;
    mockedAuthState.mockedIsLoggingOut = true;

    renderAppHeader();

    expect(screen.getByRole('button', { name: 'Logging out...' })).toBeDisabled();
  });

  it('should not display the user email when the user is authenticated but the email is empty', () => {
    mockedAuthState.mockedIsAuthenticated = true;
    mockedAuthState.mockedUser.email = '';
    renderAppHeader();

    expect(screen.queryByText('test@example.com')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
  });

  it('should have no accessibility violations, when the user is unauthenticated', async () => {
    const { container } = renderAppHeader();

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations, when the user is authenticated', async () => {
    mockedAuthState.mockedIsAuthenticated = true;
    const { container } = renderAppHeader();

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
