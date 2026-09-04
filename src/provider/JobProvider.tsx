import { useEffect } from 'react';
import { JobContext } from '../contexts/JobContext';
import type { Job } from '../constants/jobs';
import {
  getJobs,
  addJob as addJobApi,
  deleteJob as deleteJobApi,
  updateJob as updateJobApi
} from '../api/jobs';
import { useNotifications } from '../hooks/useNotifications';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function JobProvider({ children }: { children: React.ReactNode }) {
  const { addNotification } = useNotifications();
  const queryClient = useQueryClient();

  const {
    data: jobs = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
    staleTime: 30_000
  });

  useEffect(() => {
    if (isError) {
      addNotification({
        type: 'error',
        message: 'Failed to load jobs'
      });
    }
  }, [isError, addNotification]);

  const addJobMutation = useMutation({
    mutationFn: addJobApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: (error) => {
      console.log(error);

      addNotification({
        type: 'error',
        message: 'Failed to add job'
      });
    }
  });

  const updateJobMutation = useMutation({
    mutationFn: updateJobApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: (error) => {
      console.log(error);

      addNotification({
        type: 'error',
        message: 'Failed to update job'
      });
    }
  });

  const deleteJobMutation = useMutation({
    mutationFn: deleteJobApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: (error) => {
      console.log(error);

      addNotification({
        type: 'error',
        message: 'Failed to delete job'
      });
    }
  });

  function addJob(job: Omit<Job, 'id'>) {
    const newJob = { ...job, id: crypto.randomUUID() };

    addJobMutation.mutate(newJob);
  }

  async function updateJob(updatedJob: Job) {
    updateJobMutation.mutate(updatedJob);
  }

  async function deleteJob(id: Job['id']) {
    deleteJobMutation.mutate(id);
  }

  return (
    <JobContext.Provider
      value={{
        jobs,
        addJob,
        updateJob,
        deleteJob,
        isLoading
      }}
    >
      {children}
    </JobContext.Provider>
  );
}
