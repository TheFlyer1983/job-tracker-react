import type { Job } from '../../db/schema';
import { useJobs } from '../../hooks/useJobs';
import { Button } from '../inputs/button/Button';
import { useModal } from '../../hooks/useModal';

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  const { status } = job;

  const { deleteJob } = useJobs();
  const { openModal } = useModal();

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
      <article
        data-testid="job-card"
        className={`${statusBgColour} rounded-lg border p-4 text-black shadow-md`}
      >
        <h3 className="text-lg font-bold">{job.title}</h3>
        <hr />
        <div className="flex justify-between text-sm text-gray-700">
          <span className="font-bold">Company:</span>
          <span>{job.company}</span>
        </div>
        <hr />
        <div className="flex justify-between text-sm text-gray-700">
          <span className="font-bold">Location:</span>
          <span>{job.location}</span>
        </div>
        <hr />
        <div className="flex justify-between text-sm text-gray-700">
          <span className="font-bold">Salary:</span>
          <span>{job.salary}</span>
        </div>
        <hr />
        <div className="flex justify-between text-sm text-gray-700">
          <span className="font-bold">Status:</span>
          <span>{job.status}</span>
        </div>
        <hr />
        <div className="flex justify-between text-sm text-gray-700">
          <span className="font-bold">URL:</span>
          {job.url && (
            <a href={job.url} className="underline min-w-0 wrap-anywhere">
              {job.url}
            </a>
          )}
        </div>
        <hr />
        <div className="flex justify-between gap-x-4 text-sm text-gray-700">
          <span className="font-bold">Notes:</span>
          <span className="min-w-0 flex-1 break-anywhere text-right">{job.notes}</span>
        </div>
        <hr />
        <div className="my-4 flex justify-around gap-x-4 text-sm text-gray-700">
          <Button type="link" to={`/jobs/${job.id}`} label="View Job" variant="outline" />

          <Button
            variant="outline"
            onClick={() => openModal({ type: 'edit-job', job })}
            label="Edit Job"
          />

          <Button variant="outline" label="Delete Job" onClick={() => deleteJob(job.id)} />
        </div>
      </article>
  );
}
