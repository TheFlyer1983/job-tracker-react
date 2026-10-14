import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ProtectedLayouts } from './ProtectedLayouts';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router';

const mockedAuthState = vi.hoisted(() => ({
  mockedIsLoading: false,
  mockedIsAuthenticated: false
}));

vi.mock('../../provider/JobProvider', () => ({
  JobProvider: ({ children }: { children: React.ReactNode }) => children
}));

vi.mock('../../provider/ModalProvider', () => ({
  ModalProvider: ({ children }: { children: React.ReactNode }) => children
}));

vi.mock('../modals/ModalRenderer', () => ({
  default: () => <div>Modal Renderer</div>
}));

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: mockedAuthState.mockedIsAuthenticated,
    isLoading: mockedAuthState.mockedIsLoading
  })
}));

function LocationDisplay() {
  const location = useLocation();

  return <div data-testid="location">{location.pathname}</div>;
}

const renderProtectedLayouts = () => {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route element={<ProtectedLayouts />}>
          <Route path="/" element={<div>Test</div>} />
        </Route>
      </Routes>
      <LocationDisplay />
    </MemoryRouter>
  );
};

describe('ProtectedLayouts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedAuthState.mockedIsAuthenticated = false;
    mockedAuthState.mockedIsLoading = false;
  });

  it('should render the nested route content when authenticated', () => {
    mockedAuthState.mockedIsAuthenticated = true;
    renderProtectedLayouts();
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Modal Renderer')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('/');
  });

  it('should redirect to login when not authenticated', () => {
    mockedAuthState.mockedIsAuthenticated = false;
    renderProtectedLayouts();
    expect(screen.getByTestId('location')).toHaveTextContent('/login');
  });

  it('should render the loading state when loading', () => {
    mockedAuthState.mockedIsLoading = true;
    renderProtectedLayouts();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Test')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Renderer')).not.toBeInTheDocument();
    expect(screen.queryByTestId('location')).toHaveTextContent('/');
  });
});
