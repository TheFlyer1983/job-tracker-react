import { z } from 'zod';

export const createJobSchema = z.object({
  company: z.string().min(1),
  title: z.string().min(1),
  location: z.string().nullable().optional(),
  salary: z.string().nullable().optional(),
  status: z.enum(['Saved', 'Applied', 'Interview', 'Offer', 'Rejected']),
  url: z.url().nullable().optional(),
  notes: z.string().nullable().optional()
})

export const updateJobSchema = createJobSchema;