import type { Job } from '../../db/schema';
import { useJobs } from '../../hooks/useJobs';
import SelectDropdown from '../inputs/select/SelectDropdown';
import { jobStatuses } from '../../constants/jobs';
import type { JobStatus } from '../../constants/jobs';
import { Button } from '../inputs/button/Button';
import { useState } from 'react';
import { useModal } from '../../hooks/useModal';

const inputClasses =
  'w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/25';

const labelClasses = 'mb-1 block text-sm font-medium text-gray-700';

type EditJobProps = {
  editableJob: Job;
};

export default function EditJobModal({ editableJob }: EditJobProps) {
  const { updateJob } = useJobs();
  const { closeModal } = useModal();

  const [job, setJob] = useState<Job>(editableJob);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateJob(job);
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm"
      onClick={() => closeModal()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-job-title"
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 id="edit-job-title" className="text-xl font-bold text-gray-900">
            Edit Job
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">Update the details of this application.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex min-h-0 flex-col">
          <div className="grid min-h-0 grid-cols-1 gap-4 overflow-y-auto px-6 py-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="title" className={labelClasses}>
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="e.g. Frontend Developer"
                className={inputClasses}
                value={job.title}
                onChange={(e) => setJob({ ...job, title: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="company" className={labelClasses}>
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="e.g. Acme Ltd"
                className={inputClasses}
                value={job.company}
                onChange={(e) => setJob({ ...job, company: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="location" className={labelClasses}>
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g. Remote, London"
                className={inputClasses}
                value={job.location ?? ''}
                onChange={(e) => setJob({ ...job, location: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="salary" className={labelClasses}>
                Salary
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                placeholder="e.g. £45,000"
                className={inputClasses}
                value={job.salary ?? ''}
                onChange={(e) => setJob({ ...job, salary: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="status" className={labelClasses}>
                Status
              </label>
              <SelectDropdown
                options={Array.from(jobStatuses)}
                value={job.status ?? ''}
                setValue={(value) => setJob({ ...job, status: value as JobStatus })}
                className="w-full text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="url" className={labelClasses}>
                URL
              </label>
              <input
                type="url"
                id="url"
                name="url"
                placeholder="https://..."
                className={inputClasses}
                value={job.url ?? ''}
                onChange={(e) => setJob({ ...job, url: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="description" className={labelClasses}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Notes about the role..."
                className={`${inputClasses} resize-y`}
                value={job.notes ?? ''}
                onChange={(e) => setJob({ ...job, notes: e.target.value })}
              />
            </div>
          </div>
          <div className="flex flex-col-reverse gap-2 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
            <Button variant="danger" type="button" onClick={() => closeModal()} label="Cancel" />
            <Button type="submit" label="Save Job" variant="primary" />
          </div>
        </form>
      </div>
    </div>
  );
}
