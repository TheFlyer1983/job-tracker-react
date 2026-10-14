import { z } from 'zod';

export const createJobSchema = z.object({
  company: z.string().min(1).max(255),
  title: z.string().min(1).max(255),
  location: z.string().max(255).nullable().optional(),
  salary: z.string().max(255).nullable().optional(),
  status: z.enum(['Saved', 'Applied', 'Interview', 'Offer', 'Rejected']),
  url: z.url().max(255).nullable().optional(),
  notes: z.string().nullable().optional()
})

export const updateJobSchema = createJobSchema;

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;

export const jobIdSchema = z.object({
  id: z.uuid()
});