import { http, HttpResponse } from 'msw';
import { initialJobs } from '../constants/jobs';

export const handlers = [
  http.get('/api/jobs', () => {
    return HttpResponse.json(initialJobs);
  }),

  http.get('/api/jobs/:id', ({ params }) => {
    const { id } = params;

    const job = initialJobs.find((job) => job.id === id);

    if (!job) {
      return new HttpResponse(null, {
        status: 404
      });
    }

    return HttpResponse.json(job);
  })
];
