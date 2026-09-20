import { useModal } from '../../hooks/useModal';
import { lazy, Suspense } from 'react';

const AddJobModal = lazy(() => import('./AddJobModal'));
const EditJobModal = lazy(() => import('./EditJobModal'));

export default function ModalRenderer() {
  const { modal } = useModal();

  if (!modal) return null;

  return (
    <Suspense fallback={null}>
      {modal.type === 'add-job' && <AddJobModal />}
      {modal.type === 'edit-job' && <EditJobModal editableJob={modal.job} />}
    </Suspense>
  );
}
