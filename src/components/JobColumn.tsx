import type { Job, JobStatus } from '../constants/jobs';
import JobCard from './job-card/JobCard';

type JobColumnProps = {
  status: JobStatus;
  jobs: Job[];
};

export default function JobColumn({ status, jobs }: JobColumnProps) {
  return (
    <div
      className="flex shrink-0 flex-col gap-4 rounded bg-white p-4 max-md:w-72 lg:w-96"
      key={status}
    >
      <h2 className="text-center text-2xl font-bold text-black">{status}</h2>
      {jobs.map((job) => (
        <JobCard job={job} key={job.id} />
      ))}
    </div>
  );
}
