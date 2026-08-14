import type { Job } from "../constants/jobs";
import JobCard from "./JobCard";

type JobColumnProps = {
  status: string;
  jobs: Job[];
};

export default function JobColumn({ status, jobs }: JobColumnProps) {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded" key={status}>
      <h2 className="text-2xl font-bold text-black text-center">{status}</h2>
      {jobs.map((job) => (
        <JobCard job={job} key={job.id} />
      ))}
    </div>
  );
}
