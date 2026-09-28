import { Outlet } from 'react-router';
import { AuthGuard } from './AuthGuard';
import { JobProvider } from '../../provider/JobProvider';
import { ModalProvider } from '../../provider/ModalProvider';
import ModalRenderer from '../modals/ModalRenderer';

export function ProtectedLayouts() {
  return (
    <AuthGuard>
      <ModalProvider>
        <JobProvider>
          <Outlet />
          <ModalRenderer />
        </JobProvider>
      </ModalProvider>
    </AuthGuard>
  );
}