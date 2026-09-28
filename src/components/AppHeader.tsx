import { NavLink } from 'react-router';
import { Button } from './inputs/button/Button';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const focusRingClasses =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]';

function Brand() {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-900/40"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
        >
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18" />
        </svg>
      </span>
      <span className="text-white">Job Tracker</span>
    </span>
  );
}

export default function AppHeader() {
  const { user, isAuthenticated, logout, isLoggingOut } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout(undefined, {
      onSuccess: () => {
        navigate('/login');
      }
    });
  }

  return (
    <header className="mb-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 shadow-lg shadow-black/20 backdrop-blur-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* index.css styles h1 outside of Tailwind's layers, so use `!` to size it as a wordmark */}
        <h1 className="m-0! text-xl! font-bold! tracking-tight!">
          {isAuthenticated ? (
            <NavLink to="/" className={`${focusRingClasses} rounded-lg no-underline`}>
              <Brand />
            </NavLink>
          ) : (
            <Brand />
          )}
        </h1>

        {isAuthenticated && (
          <div className="flex items-center gap-3 border-t border-white/10 pt-3 sm:border-t-0 sm:pt-0">
            {user?.email && (
              <p
                className="flex min-w-0 items-center gap-2 text-sm text-gray-300"
                title={user.email}
              >
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--accent-bg) text-sm font-semibold text-(--accent) uppercase"
                >
                  {user.email.charAt(0)}
                </span>
                <span className="sr-only">Signed in as </span>
                <span className="truncate">{user.email}</span>
              </p>
            )}

            <span aria-hidden="true" className="hidden h-6 w-px bg-white/10 sm:block" />

            <div className="ml-auto sm:ml-0">
              <Button
                type="button"
                variant="secondary"
                size="small"
                label={isLoggingOut ? 'Logging out...' : 'Log out'}
                onClick={handleLogout}
                disabled={isLoggingOut}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
