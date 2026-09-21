import { useState, useRef } from 'react';
import type { Job } from '../db/schema';
import { ModalContext } from '../contexts/ModalContext';

export type Modal = { type: 'add-job' } | { type: 'edit-job'; job: Job } | null;

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<Modal>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  function openModal(modal: Modal) {
    previouslyFocusedElement.current = document.activeElement as HTMLElement;
    setModal(modal);
  }

  function closeModal() {
    previouslyFocusedElement.current?.focus();
    previouslyFocusedElement.current = null;
    setModal(null);
  }

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
