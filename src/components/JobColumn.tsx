import type { Job, JobStatus } from '../constants/jobs';
import JobCard from './JobCard';

type JobColumnProps = {
  status: JobStatus;
  jobs: Job[];
  editJob: (job: Job) => void;
};

export default function JobColumn({ status, jobs, editJob }: JobColumnProps) {
  return (
    <div
      className="flex shrink-0 flex-col gap-4 rounded bg-white p-4 max-md:w-72 lg:w-96"
      key={status}
    >
      <h2 className="text-center text-2xl font-bold text-black">{status}</h2>
      {jobs.map((job) => (
        <JobCard job={job} key={job.id} editJob={editJob} />
      ))}
    </div>
  );
}
