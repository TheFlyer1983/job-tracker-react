import { useState } from 'react';
import { NavLink } from 'react-router';
import AppHeader from '../components/AppHeader';
import { Button } from '../components/inputs/button/Button';
import type { Credentials } from '../api/routes/auth/schemas';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const inputClasses =
  'w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/25';

const labelClasses = 'mb-1 block text-sm font-medium text-gray-700';

const linkClasses =
  'font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: ''
  });

  const { register, isRegistering } = useAuth();
  const navigate = useNavigate();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    register(credentials, {
      onSuccess: () => {
        navigate('/');
      }
    });
  }

  return (
    <main className="w-full">
      <title>Create account | Job Tracker</title>

      <AppHeader />

      <section
        aria-labelledby="register-title"
        className="mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl"
      >
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 id="register-title" className="text-xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-0.5 text-sm text-gray-500">
            Start tracking your job applications in one place.
          </p>
        </div>

        {/* TODO: wire up submission with a useRegister hook */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col gap-4 px-6 py-4">
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                required
                placeholder="you@example.com"
                className={inputClasses}
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="password" className={`${labelClasses} mb-0`}>
                  Password
                </label>
                <button
                  type="button"
                  aria-controls="password confirm-password"
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((show) => !show)}
                  className={`${linkClasses} cursor-pointer text-sm`}
                >
                  {showPassword ? 'Hide' : 'Show'} password
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                autoComplete="new-password"
                required
                minLength={8}
                aria-describedby="password-hint"
                placeholder="••••••••"
                className={inputClasses}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
              <p id="password-hint" className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters.
              </p>
            </div>

            {/* Hook up form-level errors here (e.g. "Email already registered", password mismatch) */}
          </div>

          <div className="flex flex-col gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div className="*:w-full">
              <Button
                type="submit"
                variant="primary"
                label={isRegistering ? 'Creating account...' : 'Create account'}
                disabled={isRegistering}
              />
            </div>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <NavLink to="/login" className={linkClasses}>
                Sign in
              </NavLink>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
