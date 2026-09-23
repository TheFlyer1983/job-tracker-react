import type { Job } from '../db/schema';
import type { JobStatus } from '../constants/jobs';
import JobCard from './job-card/JobCard';

type JobColumnProps = {
  status: JobStatus;
  jobs: Job[];
};

export default function JobColumn({ status, jobs }: JobColumnProps) {
  return (
    <section className="flex shrink-0 flex-col gap-4 rounded bg-white p-4 w-72 lg:w-96">
      <h2 className="text-center text-2xl font-bold text-black">{status}</h2>

      {jobs.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {jobs.map((job) => (
            <li key={job.id}>
              <JobCard job={job} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No jobs found</p>
      )}
    </section>
  );
}
