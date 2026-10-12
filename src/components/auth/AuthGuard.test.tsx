import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import { AuthGuard } from './AuthGuard';
import { describe, vi, beforeEach, it, expect } from 'vitest';

const mockedAuthState = vi.hoisted(() => ({
  mockedIsLoading: false,
  mockedIsAuthenticated: false
}));

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    isLoading: mockedAuthState.mockedIsLoading,
    isAuthenticated: mockedAuthState.mockedIsAuthenticated
  })
}));

function LocationDisplay() {
  const location = useLocation();

  return <div data-testid="location">{location.pathname}</div>;
}

const renderAuthGuard = () => {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <AuthGuard>
        <div>Test</div>
      </AuthGuard>
      <LocationDisplay />
    </MemoryRouter>
  );
};

describe('AuthGuard', () => {
  beforeEach(() => {
    mockedAuthState.mockedIsLoading = false;
    mockedAuthState.mockedIsAuthenticated = false;
  });

  it('should be loading when loading is true', () => {
    mockedAuthState.mockedIsLoading = true;

    renderAuthGuard();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Test')).not.toBeInTheDocument();
  });

  it('should redirect to login when not authenticated', () => {
    renderAuthGuard();

    expect(screen.getByTestId('location')).toHaveTextContent('/login');
  });

  it('should render the children when authenticated', () => {
    mockedAuthState.mockedIsAuthenticated = true;

    renderAuthGuard();

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByTestId('location')).toHaveTextContent('/');
  });
});
