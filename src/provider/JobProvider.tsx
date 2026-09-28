import { useEffect } from 'react';
import { JobContext } from '../contexts/JobContext';
import type { Job, NewJob } from '../db/schema';
import {
  getJobs,
  addJob as addJobApi,
  deleteJob as deleteJobApi,
  updateJob as updateJobApi
} from '../api/client/jobs';
import { useNotifications } from '../hooks/useNotifications';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { DeleteJobOptions } from '../contexts/JobContext';

export function JobProvider({ children }: { children: React.ReactNode }) {
  const { addNotification } = useNotifications();
  const queryClient = useQueryClient();

  const {
    data: jobs = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
    staleTime: 30_000
  });

  useEffect(() => {
    if (error) {
      addNotification({
        type: 'error',
        message: error.message
      });
    }
  }, [error, addNotification]);

  const addJobMutation = useMutation({
    mutationFn: addJobApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      addNotification({
        type: 'success',
        message: 'Job added successfully'
      });
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
      addNotification({
        type: 'success',
        message: 'Job updated successfully'
      });
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
      queryClient.invalidateQueries({ queryKey: ['jobs'], exact: true });

      addNotification({
        type: 'success',
        message: 'Job deleted successfully'
      });
    },
    onError: (error) => {
      console.log(error);

      addNotification({
        type: 'error',
        message: 'Failed to delete job'
      });
    }
  });

  function addJob(newJob: NewJob) {
    addJobMutation.mutate(newJob);
  }

  function updateJob(updatedJob: Job) {
    updateJobMutation.mutate(updatedJob);
  }

  function deleteJob(id: Job['id'], options?: DeleteJobOptions) {
    deleteJobMutation.mutate(id, {
      onSuccess: options?.onSuccess
    });
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
