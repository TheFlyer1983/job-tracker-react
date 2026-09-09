import { text, pgTable, varchar, uuid, pgEnum } from 'drizzle-orm/pg-core';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const jobStatusEnum = pgEnum('job_status', [
  'Saved',
  'Applied',
  'Interview',
  'Offer',
  'Rejected'
]);

export const jobsTable = pgTable('jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  company: varchar('company', { length: 255 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }),
  salary: varchar('salary', { length: 255 }),
  status: jobStatusEnum('status').notNull(),
  url: varchar('url', { length: 255 }),
  notes: text('notes')
});

export type Job = InferSelectModel<typeof jobsTable>;
export type NewJob = InferInsertModel<typeof jobsTable>;
