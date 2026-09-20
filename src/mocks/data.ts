import type { Job } from '../db/schema';

export const mockJobs: Job[] = [
  {
    id: '1',
    company: 'Company 1',
    title: 'Job 1',
    location: 'Location 1',
    salary: '100000',
    status: 'Saved',
    url: 'https://www.google.com',
    notes: 'Description 1'
  }
];