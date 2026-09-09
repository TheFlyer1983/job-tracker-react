import { createContext } from 'react';
import type { Job, NewJob } from '../db/schema';

export type DeleteJobOptions = {
  onSuccess?: () => void;
};

type JobContextType = {
  jobs: Job[];
  addJob: (job: NewJob) => void;
  updateJob: (job: Job) => void;
  deleteJob: (id: Job['id'], options?: DeleteJobOptions) => void;
  isLoading: boolean;
};

export const JobContext = createContext<JobContextType | null>(null);
