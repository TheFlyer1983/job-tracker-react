import { createContext } from 'react';
import type { Job } from '../constants/jobs';

export type DeleteJobOptions = {
  onSuccess?: () => void;
};

type JobContextType = {
  jobs: Job[];
  addJob: (job: Omit<Job, 'id'>) => void;
  updateJob: (job: Job) => void;
  deleteJob: (id: Job['id'], options?: DeleteJobOptions) => void;
  isLoading: boolean;
};

export const JobContext = createContext<JobContextType | null>(null);
