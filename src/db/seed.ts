import { db } from './index';
import { jobsTable } from './schema';
import { initialJobs } from '../constants/jobs';

await db.insert(jobsTable).values(initialJobs);
