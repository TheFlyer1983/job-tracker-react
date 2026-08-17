import type { Job } from "../constants/jobs";
import { jobStatuses } from "../constants/jobs";
import JobColumn from "./JobColumn";

type JobListProps = {
  jobs: Job[];
  editJob: (job: Job) => void;
};

export default function JobList({ jobs, editJob }: JobListProps) {
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
      <div className="flex flex-row gap-4 w-max">
        {jobStatuses.map((status) => (
          <JobColumn
            status={status}
            jobs={columns[status] ?? []}
            key={status}
            editJob={editJob}
          />
        ))}
      </div>
    </>
  );
}
