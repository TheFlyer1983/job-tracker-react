import { createContext } from 'react';
import type { Job } from '../db/schema';
import type { CreateJobInput } from '../validation/jobs';

export type DeleteJobOptions = {
  onSuccess?: () => void;
};

type JobContextType = {
  jobs: Job[];
  addJob: (job: CreateJobInput) => void;
  updateJob: (job: Job) => void;
  deleteJob: (id: Job['id'], options?: DeleteJobOptions) => void;
  isLoading: boolean;
};

export const JobContext = createContext<JobContextType | null>(null);
