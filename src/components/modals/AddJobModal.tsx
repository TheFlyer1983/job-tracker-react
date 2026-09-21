import type { NewJob } from '../../db/schema';
import { useState, useRef, useEffect } from 'react';
import SelectDropdown from '../inputs/select/SelectDropdown';
import { jobStatuses } from '../../constants/jobs';
import type { JobStatus } from '../../constants/jobs';
import { useJobs } from '../../hooks/useJobs';
import { Button } from '../inputs/button/Button';
import { useModal } from '../../hooks/useModal';

const inputClasses =
  'w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/25';

const labelClasses = 'mb-1 block text-sm font-medium text-gray-700';

export default function AddJobModal() {
  const { addJob } = useJobs();
  const { closeModal } = useModal();

  const [job, setJob] = useState<NewJob>({
    company: '',
    title: '',
    location: '',
    salary: '',
    status: 'Saved',
    url: '',
    notes: ''
  });
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    addJob(job);
    closeModal();
  };

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { 
      if (e.key === 'Escape') {
        closeModal();
        return
      }

      if (e.key !== 'Tab') {
        return;
      }

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
      )

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [closeModal]);

  const dialogRef = useRef<HTMLDivElement>(null);

  return (
    <div
      data-testid="modal-backdrop"
      className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm"
      onClick={() => closeModal()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-job-title"
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 id="add-job-title" className="text-xl font-bold text-gray-900">
            Add Job
          </h2>
          <p className="mt-0.5 text-sm text-gray-500">Track a new job application.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex min-h-0 flex-col">
          <div className="grid min-h-0 grid-cols-1 gap-4 overflow-y-auto px-6 py-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="title" className={labelClasses}>
                Title
              </label>
              <input
                ref={titleInputRef}
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
              <SelectDropdown
                id="status"
                label="Status"
                options={Array.from(jobStatuses)}
                value={job.status ?? ''}
                setValue={(value) => setJob({ ...job, status: value as JobStatus })}
                className="w-full text-sm"
                labelClassName={labelClasses}
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
            <Button type="submit" label="Add Job" variant="primary" />
          </div>
        </form>
      </div>
    </div>
  );
}
