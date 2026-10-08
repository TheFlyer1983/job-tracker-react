import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Login from './Login';
import { MemoryRouter, useLocation } from 'react-router';
import { userEvent } from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { defaultAuthState, mockLogin } from '@/test/auth';

const { mockUseAuth } = vi.hoisted(() => ({
  mockUseAuth: vi.fn()
}));

vi.mock('../hooks/useAuth', () => ({
  useAuth: mockUseAuth
}));

function LocationDisplay() {
  const location = useLocation();

  return <div data-testid="location">{location.pathname}</div>;
}

const renderLoginPage = () => {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <Login />
      <LocationDisplay />
    </MemoryRouter>
  );
};

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseAuth.mockReturnValue(defaultAuthState);
  });

  it('should render the login page', () => {
    renderLoginPage();
    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should render the login form', () => {
    renderLoginPage();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('allows users to enter their credentials', async () => {
    const user = userEvent.setup();

    renderLoginPage();

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password');
  });

  it('submits the form when the user clicks the sign in button', async () => {
    const user = userEvent.setup();

    renderLoginPage();

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', { name: 'Sign in' });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password');

    await user.click(signInButton);

    expect(mockLogin).toHaveBeenCalledWith(
      {
        email: 'test@example.com',
        password: 'password'
      },
      expect.objectContaining({
        onSuccess: expect.any(Function)
      })
    );
  });

  it('should redirect to the home page when login succeeds', async () => {
    const user = userEvent.setup();

    renderLoginPage();

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', { name: 'Sign in' });

    mockLogin.mockImplementation((_credentials, options) => {
      options?.onSuccess?.();
    });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password');

    await user.click(signInButton);

    expect(screen.getByTestId('location')).toHaveTextContent('/');
  });

  it('should display an error when login fails', () => {
    mockUseAuth.mockReturnValue({
      ...defaultAuthState,
      isLoginError: true
    });

    renderLoginPage();

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Unable to sign in. Please check your email and password.'
    );
  });

  it('should disable the sign in button while logging in', () => {
    mockUseAuth.mockReturnValue({
      ...defaultAuthState,
      isLoggingIn: true
    });

    renderLoginPage();

    const button = screen.getByRole('button', {
      name: 'Signing in...'
    });

    expect(button).toBeDisabled();
  });

  it('should allow the user to show and hide their password', async () => {
    const user = userEvent.setup();

    renderLoginPage();

    const password = screen.getByLabelText('Password');

    expect(password).toHaveAttribute('type', 'password');

    await user.click(screen.getByRole('button', { name: 'Show password' }));

    expect(password).toHaveAttribute('type', 'text');

    await user.click(screen.getByRole('button', { name: 'Hide password' }));

    expect(password).toHaveAttribute('type', 'password');
  });

  it('should link to the registration page', () => {
    renderLoginPage();

    expect(screen.getByRole('link', { name: 'Create one' })).toHaveAttribute('href', '/register');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderLoginPage();

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
