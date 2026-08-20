import { useState, useEffect } from 'react';
import { JobContext } from '../contexts/JobContext';
import type { Job } from '../constants/jobs';
import { getJobs } from '../api/jobs';

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

  function addJob(job: Partial<Job>) {
    setJobs((currentJobs) => [...currentJobs, { id: crypto.randomUUID(), ...job } as Job]);
  }

  function updateJob(updatedJob: Job) {
    setJobs((currentJobs) =>
      currentJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  }

  function deleteJob(id: Job['id']) {
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
