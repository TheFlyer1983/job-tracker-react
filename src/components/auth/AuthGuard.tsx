import { useMe } from '../../hooks/useMe';
import { Navigate } from 'react-router';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data, isPending, isError } = useMe();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
