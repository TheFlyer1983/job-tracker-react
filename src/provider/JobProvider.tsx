import { useState, useEffect } from 'react';
import { JobContext } from '../contexts/JobContext';
import type { Job } from '../constants/jobs';
import {
  getJobs,
  addJob as addJobApi,
  deleteJob as deleteJobApi,
  updateJob as updateJobApi
} from '../api/jobs';

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      try {
        const jobs = await getJobs();
        setJobs(jobs);
      } catch {
        setError('Failed to load jobs');
      } finally {
        setIsLoading(false);
      }
    }

    loadJobs();
  }, []);

  async function addJob(job: Omit<Job, 'id'>) {
    setIsLoading(true);
    try {
      const newJob = { ...job, id: crypto.randomUUID() };

      const response = await addJobApi(newJob);
      setJobs((currentJobs) => [...currentJobs, response]);
    } catch {
      setError('Failed to add job');
    } finally {
      setIsLoading(false);
    }
  }

  async function updateJob(updatedJob: Job) {
    setIsLoading(true);
    try {
    await updateJobApi(updatedJob);

    setJobs((currentJobs) =>
        currentJobs.map((job) => (job.id === updatedJob.id ? { ...job, ...updatedJob } : job))
      );
    } catch {
      setError('Failed to update job');
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteJob(id: Job['id']) {
    setIsLoading(true);
    try {
    await deleteJobApi(id);

    setJobs((currentJobs) => currentJobs.filter((job) => job.id !== id));
    } catch {
      setError('Failed to delete job');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <JobContext.Provider
      value={{
        jobs,
        addJob,
        updateJob,
        deleteJob,
        error,
        isLoading
      }}
    >
      {children}
    </JobContext.Provider>
  );
}
