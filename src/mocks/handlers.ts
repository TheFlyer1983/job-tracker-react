import { http, HttpResponse } from 'msw';
import { initialJobs, type Job } from '../constants/jobs';

let jobs: Job[] = [...initialJobs];

export const handlers = [
  http.get('/api/jobs', () => {
    return HttpResponse.json(jobs);
  }),

  http.get('/api/jobs/:id', ({ params }) => {
    const { id } = params;

    const job = jobs.find((job) => job.id === id);

    if (!job) {
      return new HttpResponse(null, {
        status: 404
      });
    }

    return HttpResponse.json(job);
  }),

  http.post<never, Job>('/api/jobs', async ({ request }) => {
    const job = await request.json();

    jobs.push(job);

    return HttpResponse.json(job, { status: 201 });
  }),

  http.put<never, Job>('/api/jobs/:id', async ({ request, params }) => {
    const { id } = params;
    const updatedJob = await request.json();

    jobs = jobs.map((j) => (j.id === id ? { ...j, ...updatedJob } : j));

    return HttpResponse.json(updatedJob, { status: 200 });
  }),

  http.delete('/api/jobs/:id', ({ params }) => {
    const { id } = params;

    jobs = jobs.filter((job) => job.id !== id);

    return HttpResponse.json(null, { status: 204 });
  })
];
