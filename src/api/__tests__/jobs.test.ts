import { app } from '../app';
import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../../db';
import { jobsTable, type NewJob } from '../../db/schema';
import { eq } from 'drizzle-orm';

describe('GET /api/jobs', () => {
  beforeEach(async () => {
    await db.delete(jobsTable);
  });

  it('should return an empty array when there are no jobs', async () => {
    const response = await app.request('/api/jobs');

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual([]);
  });

  it('should return a list of jobs when there are jobs', async () => {
    const newJob: NewJob = {
      company: 'Company 1',
      title: 'Job 1',
      status: 'Saved',
      url: 'https://www.google.com',
      notes: 'Notes 1'
    };

    const [createdJob] = await db.insert(jobsTable).values(newJob).returning();

    const response = await app.request('/api/jobs');
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual([createdJob]);
  });
});

describe('GET /api/jobs/:id', () => {
  beforeEach(async () => {
    await db.delete(jobsTable);
  });

  it('should return a job when the job exists', async () => {
    const newJob: NewJob = {
      company: 'Company 1',
      title: 'Job 1',
      status: 'Saved',
      url: 'https://www.google.com',
      notes: 'Notes 1'
    };

    const [createdJob] = await db.insert(jobsTable).values(newJob).returning();

    const response = await app.request(`/api/jobs/${createdJob.id}`);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(createdJob);
  });

  it('should return a 404 when the job does not exist', async () => {
    const response = await app.request(`/api/jobs/${crypto.randomUUID()}`);
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: 'Job not found' });
  });
});

describe('POST /api/jobs', () => {
  beforeEach(async () => {
    await db.delete(jobsTable);
  });

  it('should create a new job', async () => {
    const newJob: NewJob = {
      company: 'Company 1',
      title: 'Job 1',
      status: 'Saved',
      url: 'https://www.google.com',
      notes: 'Notes 1'
    };

    const response = await app.request('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    });

    expect(response.status).toBe(201);

    const createdJob = await response.json();

    expect(createdJob).toMatchObject(newJob);
    expect(createdJob.id).toBeDefined();

    const [savedJob] = await db.select().from(jobsTable).where(eq(jobsTable.id, createdJob.id));

    expect(savedJob).toEqual(createdJob);
  });

  it('should return a 400 when the request is invalid', async () => {
    const response = await app.request('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });
    expect(response.status).toBe(400);
  });
});

describe('PUT /api/jobs/:id', () => {
  beforeEach(async () => {
    await db.delete(jobsTable);
  });

  it('should update a job', async () => {
    const newJob: NewJob = {
      company: 'Company 1',
      title: 'Job 1',
      status: 'Saved',
      url: 'https://www.google.com',
      notes: 'Notes 1'
    };

    const [createdJob] = await db.insert(jobsTable).values(newJob).returning();

    const response = await app.request(`/api/jobs/${createdJob.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        company: 'Company 1',
        title: 'Job 1',
        status: 'Applied',
        url: 'https://www.google.com',
        notes: 'Notes 1'
      })
    });

    expect(response.status).toBe(200);

    const updatedJob = await response.json();

    expect(updatedJob).toMatchObject({
      company: 'Company 1',
      title: 'Job 1',
      status: 'Applied',
      url: 'https://www.google.com',
      notes: 'Notes 1'
    });

    const [savedJob] = await db.select().from(jobsTable).where(eq(jobsTable.id, createdJob.id));

    expect(savedJob).toEqual(updatedJob);
  });

  it('should return a 400 when the request is invalid', async () => {
    const response = await app.request(`/api/jobs/${crypto.randomUUID()}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });
    expect(response.status).toBe(400);
  });

  it('should return a 404 when the job does not exist', async () => {
    const response = await app.request(`/api/jobs/${crypto.randomUUID()}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        company: 'Company 1',
        title: 'Job 1',
        status: 'Applied',
        url: 'https://www.google.com',
        notes: 'Notes 1'
      })
    });
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: 'Job not found' });
  });
});

describe('DELETE /api/jobs/:id', () => {
  beforeEach(async () => {
    await db.delete(jobsTable);
  });

  it('should delete a job', async () => {
    const newJob: NewJob = {
      company: 'Company 1',
      title: 'Job 1',
      status: 'Saved',
      url: 'https://www.google.com',
      notes: 'Notes 1'
    };

    const [createdJob] = await db.insert(jobsTable).values(newJob).returning();

    const response = await app.request(`/api/jobs/${createdJob.id}`, {
      method: 'DELETE'
    });
    expect(response.status).toBe(204);
  });

  it('should return a 404 when the job does not exist', async () => {
    const response = await app.request(`/api/jobs/${crypto.randomUUID()}`, {
      method: 'DELETE'
    });
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: 'Job not found' });
  });
});
