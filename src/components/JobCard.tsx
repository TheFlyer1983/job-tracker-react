import type { Job } from '../constants/jobs';
import { NavLink } from 'react-router';
import { useJobs } from '../hooks/useJobs';
import { Button } from './inputs/button/Button';

type JobCardProps = {
  job: Job;
  editJob: (job: Job) => void;
};

export default function JobCard({ job, editJob }: JobCardProps) {
  const { status } = job;

  const { deleteJob } = useJobs();

  const statusBgColour =
    status === 'Applied'
      ? 'bg-blue-200'
      : status === 'Interview'
        ? 'bg-green-200'
        : status === 'Offer'
          ? 'bg-yellow-200'
          : status === 'Rejected'
            ? 'bg-red-200'
            : 'bg-gray-200';

  return (
    <>
      <div className={`${statusBgColour} rounded-lg border p-4 text-black shadow-md`}>
        <div className="text-lg font-bold">{job.title}</div>
        <hr />
        <div className="flex justify-between text-sm text-gray-500">
          <span className="font-bold">Company:</span>
          <span>{job.company}</span>
        </div>
        <hr />
        <div className="flex justify-between text-sm text-gray-500">
          <span className="font-bold">Location:</span>
          <span>{job.location}</span>
        </div>
        <hr />
        <div className="flex justify-between text-sm text-gray-500">
          <span className="font-bold">Salary:</span>
          <span>{job.salary}</span>
        </div>
        <hr />
        <div className="flex justify-between text-sm text-gray-500">
          <span className="font-bold">Status:</span>
          <span>{job.status}</span>
        </div>
        <hr />
        <div className="flex justify-between text-sm text-gray-500">
          <span className="font-bold">URL:</span>
          <a href={job.url} className="underline">
            {job.url}
          </a>
        </div>
        <hr />
        <div className="flex justify-between gap-x-4 text-sm text-gray-500">
          <span className="font-bold">Notes:</span>
          <span>{job.notes}</span>
        </div>
        <hr />
        <div className="my-4 flex justify-around gap-x-4 text-sm text-gray-500">
          <Button type="link" to={`/jobs/${job.id}`} label="View Job" variant="outline" />

          <Button variant="outline" onClick={() => editJob(job)} label="Edit Job" />

          <Button variant="outline" label="Delete Job" onClick={() => deleteJob(job.id)} />
        </div>
      </div>
    </>
  );
}
