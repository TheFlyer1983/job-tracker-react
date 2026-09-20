import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { JobProvider } from './JobProvider';
import { useJobs } from '../hooks/useJobs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Job } from '../db/schema';
import { userEvent } from '@testing-library/user-event';

const mockJobs: Job[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    company: 'Company 1',
    title: 'Frontend Developer',
    location: 'Manchester',
    salary: '£60,000',
    status: 'Saved',
    url: 'https://example.com/job-1',
    notes: 'Some notes'
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    company: 'Company 2',
    title: 'Senior Frontend Developer',
    location: 'London',
    salary: '£70,000',
    status: 'Applied',
    url: 'https://example.com/job-2',
    notes: null
  }
];

const { mockAddNotification } = vi.hoisted(() => ({
  mockAddNotification: vi.fn()
}));

vi.mock('../hooks/useNotifications', () => ({
  useNotifications: () => ({
    addNotification: mockAddNotification
  })
}));

const { getJobsMock, addJobMock, updateJobMock, deleteJobMock } = vi.hoisted(() => ({
  getJobsMock: vi.fn(),
  addJobMock: vi.fn(),
  updateJobMock: vi.fn(),
  deleteJobMock: vi.fn()
}));

vi.mock('../api/jobs', () => ({
  getJobs: getJobsMock,
  addJob: addJobMock,
  updateJob: updateJobMock,
  deleteJob: deleteJobMock
}));

function createQueryClient(staleTime: number = 30_000) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime
      }
    }
  });
}

function TestConsumer({ onDeleteSuccess }: { onDeleteSuccess?: () => void }) {
  const { jobs, isLoading, addJob, updateJob, deleteJob } = useJobs();

  return (
    <div>
      <div>{jobs.length} jobs</div>
      <div>{isLoading ? 'loading' : 'loaded'}</div>

      <button
        onClick={() =>
          addJob({
            company: 'Company 3',
            title: 'Backend Developer',
            location: 'Manchester',
            salary: '£50,000',
            status: 'Applied',
            url: 'https://example.com/job-3',
            notes: 'Some notes'
          })
        }
      >
        Add Job
      </button>

      <button
        onClick={() =>
          updateJob({
            id: '11111111-1111-1111-1111-111111111111',
            company: 'Company 1',
            title: 'Frontend Developer',
            location: 'Manchester',
            salary: '£60,000',
            status: 'Applied',
            url: 'https://example.com/job-1',
            notes: 'Some notes'
          })
        }
      >
        Update Job
      </button>

      <button
        onClick={() =>
          deleteJob('11111111-1111-1111-1111-111111111111', { onSuccess: onDeleteSuccess })
        }
      >
        Delete Job
      </button>
    </div>
  );
}

describe('JobProvider', () => {
  beforeEach(() => {
    getJobsMock.mockReset();
    addJobMock.mockReset();
    mockAddNotification.mockReset();
    deleteJobMock.mockReset();
    updateJobMock.mockReset();
  });
  it('should have no jobs initially', () => {
    getJobsMock.mockResolvedValue(new Promise(() => {}));
    const queryClient = createQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText('0 jobs')).toBeInTheDocument();
    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('should show jobs when they are loaded', async () => {
    const queryClient = createQueryClient();
    getJobsMock.mockResolvedValue(mockJobs);

    render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    expect(await screen.findByText('2 jobs')).toBeInTheDocument();
  });

  it('should show a notification when jobs fail to load', async () => {
    getJobsMock.mockRejectedValue(new Error('Failed to load jobs'));
    const queryClient = createQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(mockAddNotification).toHaveBeenCalledWith({
        type: 'error',
        message: 'Failed to load jobs'
      });
    });
  });

  it(`should add a job when 'addJob()' is called`, async () => {
    const user = userEvent.setup();
    const queryClient = createQueryClient();

    getJobsMock.mockResolvedValue(mockJobs);
    addJobMock.mockResolvedValue(undefined);

    render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: 'Add Job' });
    await user.click(button);

    expect(addJobMock).toHaveBeenCalledWith(
      {
        company: 'Company 3',
        title: 'Backend Developer',
        location: 'Manchester',
        salary: '£50,000',
        status: 'Applied',
        url: 'https://example.com/job-3',
        notes: 'Some notes'
      },
      expect.anything()
    );
  });

  it(`should update a job when 'updateJob()' is called`, async () => {
    const user = userEvent.setup();
    const queryClient = createQueryClient();

    getJobsMock.mockResolvedValue(mockJobs);
    updateJobMock.mockResolvedValue(undefined);

    render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: 'Update Job' });
    await user.click(button);

    expect(updateJobMock).toHaveBeenCalledWith(
      {
        id: '11111111-1111-1111-1111-111111111111',
        company: 'Company 1',
        title: 'Frontend Developer',
        location: 'Manchester',
        salary: '£60,000',
        status: 'Applied',
        url: 'https://example.com/job-1',
        notes: 'Some notes'
      },
      expect.anything()
    );
  });

  it(`should delete a job when 'deleteJob()' is called`, async () => {
    const user = userEvent.setup();
    const queryClient = createQueryClient();

    getJobsMock.mockResolvedValue(mockJobs);
    deleteJobMock.mockResolvedValue(undefined);

    render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: 'Delete Job' });
    await user.click(button);

    expect(deleteJobMock).toHaveBeenCalledWith(
      '11111111-1111-1111-1111-111111111111',
      expect.anything()
    );
  });

  it(`'addJob()' invalidates the jobs query`, async () => {
    const user = userEvent.setup();
    const queryClient = createQueryClient();

    const invalidateQueriesMock = vi.spyOn(queryClient, 'invalidateQueries');
    addJobMock.mockResolvedValue(undefined);

    render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: 'Add Job' });
    await user.click(button);

    await waitFor(() => expect(invalidateQueriesMock).toHaveBeenCalledWith({ queryKey: ['jobs'] }));
  });

  it(`'addJob()' fails`, async () => {
    const user = userEvent.setup();
    const queryClient = createQueryClient();

    addJobMock.mockRejectedValue(new Error('Failed to add job'));

    render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: 'Add Job' });
    await user.click(button);

    await waitFor(() =>
      expect(mockAddNotification).toHaveBeenCalledWith({
        type: 'error',
        message: 'Failed to add job'
      })
    );
  });

  it(`'updateJob()' invalidates the jobs query`, async () => {
    const user = userEvent.setup();
    const queryClient = createQueryClient();

    const invalidateQueriesMock = vi.spyOn(queryClient, 'invalidateQueries');
    updateJobMock.mockResolvedValue(undefined);

    render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: 'Update Job' });
    await user.click(button);

    await waitFor(() => expect(invalidateQueriesMock).toHaveBeenCalledWith({ queryKey: ['jobs'] }));
  });

  it(`'updateJob()' fails`, async () => {
    const user = userEvent.setup();
    const queryClient = createQueryClient();

    updateJobMock.mockRejectedValue(new Error('Failed to update job'));

    render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: 'Update Job' });
    await user.click(button);

    await waitFor(() =>
      expect(mockAddNotification).toHaveBeenCalledWith({
        type: 'error',
        message: 'Failed to update job'
      })
    );
  });

  it(`'deleteJob()' invalidates the jobs query`, async () => {
    const user = userEvent.setup();
    const queryClient = createQueryClient();

    const invalidateQueriesMock = vi.spyOn(queryClient, 'invalidateQueries');
    deleteJobMock.mockResolvedValue(undefined);

    render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: 'Delete Job' });
    await user.click(button);

    await waitFor(() =>
      expect(invalidateQueriesMock).toHaveBeenCalledWith({ exact: true, queryKey: ['jobs'] })
    );
  });

  it(`'deleteJob()' fails`, async () => {
    const user = userEvent.setup();
    const queryClient = createQueryClient();

    deleteJobMock.mockRejectedValue(new Error('Failed to delete job'));

    render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: 'Delete Job' });
    await user.click(button);

    await waitFor(() =>
      expect(mockAddNotification).toHaveBeenCalledWith({
        type: 'error',
        message: 'Failed to delete job'
      })
    );
  });

  it(`'deleteJob()' runs the success callback`, async () => {
    const onDeleteSuccessMock = vi.fn();
    const user = userEvent.setup();
    const queryClient = createQueryClient();

    deleteJobMock.mockResolvedValue(undefined);

    render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer onDeleteSuccess={onDeleteSuccessMock} />
        </JobProvider>
      </QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: 'Delete Job' });
    await user.click(button);

    await waitFor(() => expect(onDeleteSuccessMock).toHaveBeenCalled());
  });

  it('should use the cached jobs when multiple providers request the same query', async () => {
    const queryClient = createQueryClient();
    getJobsMock.mockResolvedValue(mockJobs);

    render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>

        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    expect(getJobsMock).toHaveBeenCalledTimes(1);
  });

  it(`'addJob()' refetches the jobs query after invalidation`, async () => {
    const user = userEvent.setup();

    const updatedJobs: Job[] = [
      ...mockJobs,
      {
        id: '33333333-3333-3333-3333-333333333333',
        company: 'Company 3',
        title: 'Backend Developer',
        location: 'Manchester',
        salary: '£50,000',
        status: 'Applied',
        url: 'https://example.com/job-3',
        notes: 'Some notes'
      }
    ];

    const queryClient = createQueryClient();
    getJobsMock.mockResolvedValueOnce(mockJobs).mockResolvedValueOnce(updatedJobs);
    addJobMock.mockResolvedValue(undefined);

    render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    expect(await screen.findByText('2 jobs')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Add Job' });
    await user.click(button);

    expect(await screen.findByText('3 jobs')).toBeInTheDocument();
    expect(getJobsMock).toHaveBeenCalledTimes(2);
  });

  it(`'while the query is not stale, re-rendering the component does not refetch the jobs query`, async () => {
    const queryClient = createQueryClient();
    getJobsMock.mockResolvedValueOnce(mockJobs);

    const { rerender } = render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    expect(await screen.findByText('2 jobs')).toBeInTheDocument();

    rerender(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    expect(await screen.findByText('2 jobs')).toBeInTheDocument();
    expect(getJobsMock).toHaveBeenCalledTimes(1);
  });

  it(`while the query is stale, remounting the component refetches the jobs query`, async () => {
    const queryClient = createQueryClient(0);
    getJobsMock.mockResolvedValueOnce(mockJobs).mockResolvedValueOnce(mockJobs);

    const { unmount } = render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    expect(await screen.findByText('2 jobs')).toBeInTheDocument();

    vi.useFakeTimers();
    vi.advanceTimersByTime(30_000);

    unmount();

    render(
      <QueryClientProvider client={queryClient}>
        <JobProvider>
          <TestConsumer />
        </JobProvider>
      </QueryClientProvider>
    );

    expect(getJobsMock).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });
});
