import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ModalProvider } from './ModalProvider';
import { useModal } from '../hooks/useModal';
import { userEvent } from '@testing-library/user-event';

function TestConsumer() {
  const { modal, openModal, closeModal } = useModal();

  return (
    <div>
      <div>{modal ? modal.type : 'no-modal'}</div>
      <button onClick={() => openModal({ type: 'add-job' })}>Open Add Job Modal</button>
      <button onClick={closeModal}>Close Modal</button>
    </div>
  );
}

describe('ModalProvider', () => {
  it('should have no modal initially', () => {
    render(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>
    );

    expect(screen.getByText('no-modal')).toBeInTheDocument();
  });

  it('should open a modal when the button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Open Add Job Modal' }));

    expect(screen.getByText('add-job')).toBeInTheDocument();
  });

  it('should close the modal when the button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Close Modal' }));

    expect(screen.getByText('no-modal')).toBeInTheDocument();
  });
});
