import { http, HttpResponse } from 'msw';
import { mockJobs } from './data';
import type { NewJob, Job } from '../db/schema';

export const handlers = [
  http.get('/api/jobs', () => {
    return HttpResponse.json(mockJobs);
    // return HttpResponse.json(null, { status: 500 });
  }),

  http.get('/api/jobs/:id', ({ params }) => {
    const { id } = params;
    const job = mockJobs.find((job) => job.id === id);
    if (!job) {
      return new HttpResponse(null, {
        status: 404
      });
    }
    return HttpResponse.json(job);
  }),

  http.post<never, NewJob>('/api/jobs', async ({ request }) => {
    const job = await request.json();

    return HttpResponse.json({ ...job, id: '2' }, { status: 201 });
  }),

  http.put<never, Job>('/api/jobs/:id', async ({ request, params }) => {
    const { id } = params;
    const updatedJob = await request.json();

    return HttpResponse.json({ ...updatedJob, id }, { status: 200 });
  }),
  
  http.delete('/api/jobs/:id', () => {
    return new HttpResponse(null, { status: 204 });
  })
];
