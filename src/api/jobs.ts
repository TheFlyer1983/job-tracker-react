import type { Job } from '../constants/jobs';

export async function getJobs(): Promise<Job[]> {
  const response = await fetch('/api/jobs');

  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }

  return response.json();
}

export async function getJob(id: Job['id']): Promise<Job> {
  const response = await fetch(`/api/jobs/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch job');
  }

  return response.json();
}
