import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Register from './Register';
import { MemoryRouter, useLocation } from 'react-router';
import { userEvent } from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { defaultAuthState, mockRegister } from '@/test/auth';

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

const renderRegisterPage = () => {
  return render(
    <MemoryRouter initialEntries={['/register']}>
      <Register />
      <LocationDisplay />
    </MemoryRouter>
  );
};

describe('Register Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue(defaultAuthState);
  });

  it('should render the register page', () => {
    renderRegisterPage();
    expect(screen.getByRole('heading', { name: 'Create your account' })).toBeInTheDocument();
  });

  it('should render the register form', () => {
    renderRegisterPage();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create account' })).toBeInTheDocument();
  });

  it('allows users to enter their credentials', async () => {
    const user = userEvent.setup();

    renderRegisterPage();

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password');
  });

  it('submits the form when the user clicks the create account button', async () => {
    const user = userEvent.setup();

    renderRegisterPage();

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const createAccountButton = screen.getByRole('button', { name: 'Create account' });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password');

    await user.click(createAccountButton);

    expect(mockRegister).toHaveBeenCalledWith(
      {
        email: 'test@example.com',
        password: 'password'
      },
      expect.objectContaining({
        onSuccess: expect.any(Function)
      })
    );
  });

  it('should redirect to the home page when register succeeds', async () => {
    const user = userEvent.setup();

    renderRegisterPage();

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const createAccountButton = screen.getByRole('button', { name: 'Create account' });

    mockRegister.mockImplementation((_credentials, options) => {
      options?.onSuccess?.();
    });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password');

    await user.click(createAccountButton);

    expect(screen.getByTestId('location')).toHaveTextContent('/');
  });

  it.skip('should display an error when register fails', () => {
    mockUseAuth.mockReturnValue({
      ...defaultAuthState,
      isRegisterError: true
    });

    renderRegisterPage();

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Unable to sign in. Please check your email and password.'
    );
  });

  it('should disable the create account button while registering', () => {
    mockUseAuth.mockReturnValue({
      ...defaultAuthState,
      isRegistering: true
    });

    renderRegisterPage();

    const button = screen.getByRole('button', {
      name: 'Creating account...'
    });

    expect(button).toBeDisabled();
  });

  it('should allow the user to show and hide their password', async () => {
    const user = userEvent.setup();

    renderRegisterPage();

    const password = screen.getByLabelText('Password');

    expect(password).toHaveAttribute('type', 'password');

    await user.click(screen.getByRole('button', { name: 'Show password' }));

    expect(password).toHaveAttribute('type', 'text');

    await user.click(screen.getByRole('button', { name: 'Hide password' }));

    expect(password).toHaveAttribute('type', 'password');
  });

  it('should link to the login page', () => {
    renderRegisterPage();

    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/login');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderRegisterPage();

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
