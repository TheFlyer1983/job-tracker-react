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

export async function addJob(job: Job): Promise<Job> {
  const response = await fetch('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(job),
  })

  if (!response.ok) {
    throw new Error('Failed to add job');
  }

  return response.json();
}

export async function updateJob(updatedJob: Job): Promise<Job> {
  const response = await fetch(`/api/jobs/${updatedJob.id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedJob),
  })

  if (!response.ok) {
    throw new Error('Failed to update job');
  }

  return response.json();
}

export async function deleteJob(id: Job['id']): Promise<void> { 
  const response = await fetch(`/api/jobs/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete job');
  }
}