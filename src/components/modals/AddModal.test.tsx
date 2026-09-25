import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AddJob from './AddJobModal';
import { MemoryRouter } from 'react-router';
import { userEvent } from '@testing-library/user-event';
import { axe } from 'vitest-axe';

const { mockAddJob } = vi.hoisted(() => ({
  mockAddJob: vi.fn()
}));

const { mockCloseModal } = vi.hoisted(() => ({
  mockCloseModal: vi.fn()
}));

vi.mock('../../hooks/useJobs', () => ({
  useJobs: () => ({
    addJob: mockAddJob
  })
}));

vi.mock('../../hooks/useModal', () => ({
  useModal: () => ({
    closeModal: mockCloseModal
  })
}));

const renderAddJobModal = () => {
  return render(
    <MemoryRouter>
      <AddJob />
    </MemoryRouter>
  );
};

describe('AddJobModal', () => {
  describe('renders the add job modal', () => {
    beforeEach(() => {
      renderAddJobModal();
    });

    it('renders the add job modal title', () => {
      expect(screen.getByRole('heading', { name: 'Add Job' })).toBeInTheDocument();
    });

    it('renders the add job modal company input', () => {
      expect(screen.getByLabelText('Company')).toBeInTheDocument();
    });

    it('renders the add job modal title input', () => {
      expect(screen.getByLabelText('Title')).toBeInTheDocument();
    });

    it('renders the add job modal location input', () => {
      expect(screen.getByLabelText('Location')).toBeInTheDocument();
    });

    it('renders the add job modal salary input', () => {
      expect(screen.getByLabelText('Salary')).toBeInTheDocument();
    });

    it('renders the add job modal status input', () => {
      expect(screen.getByLabelText('Status')).toBeInTheDocument();
    });

    it('renders the add job modal url input', () => {
      expect(screen.getByLabelText('URL')).toBeInTheDocument();
    });

    it('renders the add job modal notes input', () => {
      expect(screen.getByLabelText('Description')).toBeInTheDocument();
    });

    it('renders the add job modal submit button', () => {
      expect(screen.getByRole('button', { name: 'Add Job' })).toBeInTheDocument();
    });

    it('renders the cancel button', () => {
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });

    it('allows the user to enter job details', async () => {
      const user = userEvent.setup();

      const titleInput = screen.getByLabelText('Title');
      const companyInput = screen.getByLabelText('Company');
      const locationInput = screen.getByLabelText('Location');
      const salaryInput = screen.getByLabelText('Salary');
      const statusInput = screen.getByLabelText('Status');
      const urlInput = screen.getByLabelText('URL');
      const descriptionInput = screen.getByLabelText('Description');

      await user.type(titleInput, 'Software Engineer');
      await user.type(companyInput, 'Google');
      await user.type(locationInput, 'London');
      await user.type(salaryInput, '£100,000');
      await user.selectOptions(statusInput, 'Applied');
      await user.type(urlInput, 'https://www.google.com');
      await user.type(descriptionInput, 'I applied for this job because I want to work at Google');

      expect(titleInput).toHaveValue('Software Engineer');
      expect(companyInput).toHaveValue('Google');
      expect(locationInput).toHaveValue('London');
      expect(salaryInput).toHaveValue('£100,000');
      expect(statusInput).toHaveValue('Applied');
      expect(urlInput).toHaveValue('https://www.google.com');
      expect(descriptionInput).toHaveValue(
        'I applied for this job because I want to work at Google'
      );
    });

    it('allows the user to submit the form', async () => {
      const user = userEvent.setup();

      const titleInput = screen.getByLabelText('Title');
      const companyInput = screen.getByLabelText('Company');

      await user.type(titleInput, 'Software Engineer');
      await user.type(companyInput, 'Google');

      await user.click(screen.getByRole('button', { name: 'Add Job' }));

      expect(mockAddJob).toHaveBeenCalledWith({
        title: 'Software Engineer',
        company: 'Google',
        location: '',
        salary: '',
        status: 'Saved',
        url: '',
        notes: ''
      });

      expect(mockCloseModal).toHaveBeenCalled();
    });

    it('closes the modal when the cancel button is clicked', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(mockCloseModal).toHaveBeenCalled();
    });

    it('closes the modal when the backdrop is clicked', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByTestId('modal-backdrop'));

      expect(mockCloseModal).toHaveBeenCalled();
    });

    it('does not close the modal when clicking inside the dialog', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByRole('dialog'));

      expect(mockCloseModal).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should pass accessibility tests', async () => {
      const { container } = renderAddJobModal();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
