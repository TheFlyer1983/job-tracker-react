import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ModalRenderer from './ModalRenderer';
import { MemoryRouter } from 'react-router';

const { mockModal } = vi.hoisted(() => ({
  mockModal: vi.fn()
}));

vi.mock('../../hooks/useModal', () => ({
  useModal: () => ({
    modal: mockModal()
  })
}));

vi.mock('./AddJobModal', () => ({
  default: () => (
    <div role="dialog" aria-label="Add Job Modal">
      Add Job Modal
    </div>
  )
}));

vi.mock('./EditJobModal', () => ({
  default: () => (
    <div role="dialog" aria-label="Edit Job Modal">
      Edit Job Modal
    </div>
  )
}));

const renderModalRenderer = () => {
  return render(
    <MemoryRouter>
      <ModalRenderer />
    </MemoryRouter>
  );
};

describe('ModalRenderer', () => {
  describe('when no modal is set', () => {
    it('should not render any modal', () => {
      mockModal.mockReturnValue(null);

      renderModalRenderer();

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('when a modal is set', () => {
    it('should render the add job modal', async () => {
      mockModal.mockReturnValue({ type: 'add-job' });

      renderModalRenderer();

      expect(await screen.findByRole('dialog', { name: 'Add Job Modal' })).toBeInTheDocument();
    });

    it('should render the edit job modal', async () => {
      mockModal.mockReturnValue({
        type: 'edit-job',
        job: {
          id: '1',
          title: 'Test Job',
          company: 'Test Company',
          location: 'Test Location',
          status: 'Applied',
          url: 'https://test.com',
          notes: 'Test Notes'
        }
      });

      renderModalRenderer();

      expect(await screen.findByRole('dialog', { name: 'Edit Job Modal' })).toBeInTheDocument();
    });
  });
});
