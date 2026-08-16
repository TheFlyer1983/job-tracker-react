import type { Job, JobStatus } from "../constants/jobs";
import JobCard from "./JobCard";

type JobColumnProps = {
  status: JobStatus;
  jobs: Job[];
  editJob: (job: Job) => void;
  deleteJob: (job: Job) => void;
};

export default function JobColumn({ status, jobs, editJob, deleteJob }: JobColumnProps) {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded lg:w-96 max-md:w-72 shrink-0" key={status}>
      <h2 className="text-2xl font-bold text-black text-center">{status}</h2>
      {jobs.map((job) => (
        <JobCard job={job} key={job.id} editJob={editJob} deleteJob={deleteJob} />
      ))}
    </div>
  );
}
