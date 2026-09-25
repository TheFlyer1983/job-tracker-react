import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import JobCard from './JobCard';
import type { Job } from '../../db/schema';
import { MemoryRouter, useLocation } from 'react-router';
import { userEvent } from '@testing-library/user-event';
import { axe } from 'vitest-axe';

const mockDeleteJob = vi.fn();
const mockOpenModal = vi.fn();

vi.mock('../../hooks/useJobs', () => ({
  useJobs: () => ({
    deleteJob: mockDeleteJob
  })
}));

vi.mock('../../hooks/useModal', () => ({
  useModal: () => ({
    openModal: mockOpenModal
  })
}));

const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

const job: Job = {
  id: '1',
  company: 'Company',
  title: 'Title',
  location: 'Location',
  salary: 'Salary',
  status: 'Saved',
  url: 'https://www.google.com',
  notes: 'Notes'
};

const renderJobCard = (job: Job) => {
  return render(
    <MemoryRouter>
      <JobCard job={job} />
      <LocationDisplay />
    </MemoryRouter>
  );
};

describe('JobCard', () => {
  describe('renders the job card', () => {
    beforeEach(() => {
      renderJobCard(job);
    });

    it('renders the job card title', () => {
      expect(screen.getByText('Title')).toBeInTheDocument();
    });
    it('renders the job card company', () => {
      expect(screen.getByText('Company')).toBeInTheDocument();
    });
    it('renders the job card location', () => {
      expect(screen.getByText('Location')).toBeInTheDocument();
    });
    it('renders the job card salary', () => {
      expect(screen.getByText('Salary')).toBeInTheDocument();
    });

    it('renders the job card status', () => {
      expect(screen.getByText('Saved')).toBeInTheDocument();
    });

    it('renders the job card notes', () => {
      expect(screen.getByText('Notes')).toBeInTheDocument();
    });

    it('renders the job card actions', () => {
      expect(screen.getByRole('link', { name: 'View Job' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Edit Job' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Delete Job' })).toBeInTheDocument();
    });

    it('deletes the job when the delete job button is clicked', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByRole('button', { name: 'Delete Job' }));

      expect(mockDeleteJob).toHaveBeenCalledWith(job.id);
    });

    it('opens the edit job modal when the edit job button is clicked', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByRole('button', { name: 'Edit Job' }));

      expect(mockOpenModal).toHaveBeenCalledWith({
        type: 'edit-job',
        job
      });
    });

    it('navigates to the job details page when the view job button is clicked', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByRole('link', { name: 'View Job' }));

      expect(screen.getByTestId('location-display')).toHaveTextContent('/jobs/1');
    });
  });

  describe('it renders the correct background color for the job card', () => {
    it.each([
      ['Saved', 'bg-gray-200'],
      ['Applied', 'bg-blue-200'],
      ['Interview', 'bg-green-200'],
      ['Offer', 'bg-yellow-200'],
      ['Rejected', 'bg-red-200']
    ])('uses the correct background colour for %s jobs', (status, expectedClass) => {
      renderJobCard({
        ...job,
        status: status as Job['status']
      });

      expect(screen.getByTestId('job-card')).toHaveClass(expectedClass);
    });
  });

  describe('when the url is provided', () => {
    beforeEach(() => {
      renderJobCard(job);
    });

    it('renders the job card url', () => {
      const link = screen.getByRole('link', { name: 'https://www.google.com' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://www.google.com');
    });
  });

  describe('when the URL is not provided', () => {
    const jobUrl = job.url;
    const jobWithoutUrl: Job = {
      ...job,
      url: null
    };

    beforeEach(() => {
      renderJobCard(jobWithoutUrl);
    });

    it('does not render the job card url', () => {
      expect(screen.queryByRole('link', { name: jobUrl! })).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should pass accessibility tests', async () => {
      const { container } = renderJobCard(job);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
