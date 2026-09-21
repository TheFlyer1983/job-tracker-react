import type { Job } from '../db/schema';
import { jobStatuses } from '../constants/jobs';
import JobColumn from './JobColumn';

type JobListProps = {
  jobs: Job[];
};

export default function JobList({ jobs }: JobListProps) {
  const columns: Record<string, Job[]> = {};

  for (const job of jobs) {
    if (job.status in columns) {
      columns[job.status].push(job);
    } else {
      columns[job.status] = [job];
    }
  }

  return (
    <div className="flex w-max flex-row gap-4">
      {jobStatuses.map((status) => (
        <JobColumn status={status} jobs={columns[status] ?? []} key={status} />
      ))}
    </div>
  );
}
