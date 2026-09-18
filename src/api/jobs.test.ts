import { getJobs, getJob, addJob, updateJob, deleteJob } from './jobs';
import { describe, it, expect } from 'vitest';
import { mockJobs } from '../mocks/data';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import type { NewJob, Job } from '../db/schema';

describe('getJobs', () => {
  it('should return a list of jobs', async () => {
    const jobs = await getJobs();
    expect(jobs).toEqual(mockJobs);
  });

  it('should throw an error if the request fails', async () => {
    server.use(
      http.get('/api/jobs', () => {
        return HttpResponse.json(null, { status: 500 });
      })
    );

    await expect(getJobs()).rejects.toThrow('Failed to fetch jobs');
  });
});

describe('getJob', () => {
  it('should return a job', async () => {
    const job = await getJob('1');
    expect(job).toEqual(mockJobs[0]);
    expect(job).toHaveProperty('id', '1');
  });

  it('should throw an error if the request fails', async () => {
    server.use(
      http.get('/api/jobs/:id', () => {
        return HttpResponse.json(null, { status: 500 });
      })
    );

    await expect(getJob('1')).rejects.toThrow('Failed to fetch job');
  });
});

describe('addJob', () => {
  const newJob: NewJob = {
    company: 'Company 2',
    title: 'Job 2',
    location: 'Location 2',
    salary: '100000',
    status: 'Saved',
    url: 'https://www.google.com',
    notes: 'Description 2'
  };
  it('should add a job', async () => {
    const job = await addJob(newJob);
    expect(job).toEqual({ ...newJob, id: '2' });
  });

  it('should throw an error if the request fails', async () => {
    server.use(
      http.post('/api/jobs', () => {
        return HttpResponse.json(null, { status: 500 });
      })
    );

    await expect(addJob(newJob)).rejects.toThrow('Failed to add job');
  });
});

describe('updateJob', () => {
  const updatedJob: Job = {
    id: '1',
    company: 'Company 2',
    title: 'Job 2',
    location: 'Location 2',
    salary: '100000',
    status: 'Saved',
    url: 'https://www.google.com',
    notes: 'Description 2'
  };
  it('should update a job', async () => {
    const job = await updateJob(updatedJob);
    expect(job).toEqual(updatedJob);
  });

  it('should throw an error if the request fails', async () => {
    server.use(
      http.put('/api/jobs/:id', () => {
        return HttpResponse.json(null, { status: 500 });
      })
    );

    await expect(updateJob(updatedJob)).rejects.toThrow('Failed to update job');
  });
});

describe('deleteJob', () => {
  it('should delete a job', async () => {
    await expect(deleteJob('1')).resolves.toBeUndefined();
  });

  it('should throw an error if the request fails', async () => {
    server.use(http.delete('/api/jobs/:id', () => {
      return HttpResponse.json(null, { status: 500 });
    }));

    await expect(deleteJob('1')).rejects.toThrow('Failed to delete job');
  });
});