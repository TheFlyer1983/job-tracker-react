import type { Job } from "../constants/jobs";
import JobColumn from "./JobColumn";

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
    <>
      <div className="flex flex-row gap-4 max-w-full">
        {Object.entries(columns).map(([status, jobs]) => {
          return (
            <JobColumn status={status} jobs={jobs} key={status} />
          );
        })}
      </div>
    </>
  );
}
