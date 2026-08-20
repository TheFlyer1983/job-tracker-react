import { useState, useEffect } from 'react';
import { JobContext } from '../contexts/JobContext';
import type { Job } from '../constants/jobs';
import { getJobs, addJob as addJobApi, deleteJob as deleteJobApi, updateJob as updateJobApi } from '../api/jobs';

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
    const newJob = { ...job, id: crypto.randomUUID() };

    const response = await addJobApi(newJob);
    setJobs((currentJobs) => [...currentJobs, response]);
  }

  async function updateJob(updatedJob: Job) {
    await updateJobApi(updatedJob);
    
    setJobs((currentJobs) =>
      currentJobs.map((job) => (job.id === updatedJob.id ? {...job, ...updatedJob} : job))
    );
  }

  async function deleteJob(id: Job['id']) {
    await deleteJobApi(id);

    setJobs((currentJobs) => currentJobs.filter((job) => job.id !== id));
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
