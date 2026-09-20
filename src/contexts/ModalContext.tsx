import { createContext } from 'react';
import type { Modal } from '../provider/ModalProvider';

type ModalContextType = {
  modal: Modal | null;
  openModal: (modal: Modal) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);
