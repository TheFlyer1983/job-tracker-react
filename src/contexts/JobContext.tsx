import { createContext } from "react";
import type { Job } from "../constants/jobs";

type JobContextType = {
  jobs: Job[];
  addJob: (job: Partial<Job>) => void;
  updateJob: (job: Job) => void;
  deleteJob: (id: Job["id"]) => void;
  error: string | null;
  isLoading: boolean;
};

export const JobContext = createContext<JobContextType | null>(null);
