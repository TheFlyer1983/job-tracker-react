import { useState } from 'react';
import type { Job } from '../db/schema';
import { ModalContext } from '../contexts/ModalContext';

export type Modal = { type: 'add-job' } | { type: 'edit-job'; job: Job } | null;

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<Modal>(null);

  function openModal(modal: Modal) {
    setModal(modal);
  }

  function closeModal() {
    setModal(null);
  }

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
