import type { Job } from '../constants/jobs';
import { useState } from 'react';
import SelectDropdown from './inputs/SelectDropdown';
import { jobStatuses } from '../constants/jobs';
import type { JobStatus } from '../constants/jobs';
import { useJobs } from '../hooks/useJobs';
import { Button } from './inputs/button/Button';

type AddJobProps = {
  handleToggleModal: (modalName?: string | null) => void;
};

export default function AddJob({ handleToggleModal }: AddJobProps) {
  const { addJob } = useJobs();
  const [job, setJob] = useState<Omit<Job, 'id'>>({
    company: '',
    title: '',
    location: '',
    salary: '',
    status: '',
    url: '',
    notes: ''
  });
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    addJob(job);
    handleToggleModal();
  };
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/50"
      onClick={() => handleToggleModal()}
    >
      <div
        className="flex w-lg flex-col items-center justify-center rounded-md bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold">Add Job</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="rounded-md border border-gray-300 p-2"
                value={job.title}
                onChange={(e) => setJob({ ...job, title: e.target.value })}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                className="rounded-md border border-gray-300 p-2"
                value={job.company}
                onChange={(e) => setJob({ ...job, company: e.target.value })}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                className="rounded-md border border-gray-300 p-2"
                value={job.location}
                onChange={(e) => setJob({ ...job, location: e.target.value })}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="salary">Salary</label>
              <input
                type="text"
                id="salary"
                name="salary"
                className="rounded-md border border-gray-300 p-2"
                value={job.salary}
                onChange={(e) => setJob({ ...job, salary: e.target.value })}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="url">URL</label>
              <input
                type="url"
                id="url"
                name="url"
                className="rounded-md border border-gray-300 p-2"
                value={job.url}
                onChange={(e) => setJob({ ...job, url: e.target.value })}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="rounded-md border border-gray-300 p-2"
                value={job.notes}
                onChange={(e) => setJob({ ...job, notes: e.target.value })}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="status">Status</label>
              <SelectDropdown
                options={Array.from(jobStatuses)}
                value={job.status}
                setValue={(value) => setJob({ ...job, status: value as JobStatus })}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-2 pt-4">
            <Button type="submit" label="Add Job" variant="primary" />
            <Button
              variant="danger"
              type="button"
              onClick={() => handleToggleModal()}
              label="Cancel"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
