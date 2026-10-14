import type { Job } from '../../db/schema';
import type { CreateJobInput, UpdateJobInput } from '../../validation/jobs';
import { hc } from 'hono/client';
import type { AppType } from '../app';

const client = hc<AppType>('/');

export async function getJobs() {
  const response = await client.api.jobs.$get();

  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }

  return response.json();
}

export async function getJob(id: Job['id']) {
  const response = await client.api.jobs[':id'].$get({ param: { id } });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error ?? 'Failed to fetch job');
  }

  return response.json();
}

export async function addJob(job: CreateJobInput) {
  const response = await client.api.jobs.$post({ json: job });

  if (!response.ok) {
    throw new Error('Failed to add job');
  }

  return response.json();
}

export async function updateJob(updatedJob: Job) {
  const { id, ...payload } = updatedJob;
  const response = await client.api.jobs[':id'].$put({
    param: { id },
    json: payload
  });

  if (!response.ok) {
    throw new Error('Failed to update job');
  }

  return response.json();
}

export async function deleteJob(id: Job['id']) {
  const response = await client.api.jobs[':id'].$delete({ param: { id } });

  if (!response.ok) {
    throw new Error('Failed to delete job');
  }
}
