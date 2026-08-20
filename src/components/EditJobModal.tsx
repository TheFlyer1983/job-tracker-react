import type { Job } from '../constants/jobs';
import { useJobs } from '../hooks/useJobs';
import SelectDropdown from './inputs/SelectDropdown';
import { jobStatuses } from '../constants/jobs';
import type { JobStatus } from '../constants/jobs';

type EditJobProps = {
  editableJob: Job;
  setEditableJob: (job: Job) => void;
  handleToggleModal: (modalName?: string | null) => void;
};

export default function EditJobModal({
  editableJob,
  setEditableJob,
  handleToggleModal
}: EditJobProps) {
  const { updateJob } = useJobs();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateJob(editableJob);
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
        <h1 className="text-2xl font-bold">Edit Job</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="rounded-md border border-gray-300 p-2"
                value={editableJob.title}
                onChange={(e) => setEditableJob({ ...editableJob, title: e.target.value })}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                className="rounded-md border border-gray-300 p-2"
                value={editableJob.company}
                onChange={(e) => setEditableJob({ ...editableJob, company: e.target.value })}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                className="rounded-md border border-gray-300 p-2"
                value={editableJob.location}
                onChange={(e) => setEditableJob({ ...editableJob, location: e.target.value })}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="salary">Salary</label>
              <input
                type="text"
                id="salary"
                name="salary"
                className="rounded-md border border-gray-300 p-2"
                value={editableJob.salary}
                onChange={(e) => setEditableJob({ ...editableJob, salary: e.target.value })}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="url">URL</label>
              <input
                type="url"
                id="url"
                name="url"
                className="rounded-md border border-gray-300 p-2"
                value={editableJob.url}
                onChange={(e) => setEditableJob({ ...editableJob, url: e.target.value })}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="rounded-md border border-gray-300 p-2"
                value={editableJob.notes}
                onChange={(e) => setEditableJob({ ...editableJob, notes: e.target.value })}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <label htmlFor="status">Status</label>
              <SelectDropdown
                options={Array.from(jobStatuses)}
                value={editableJob.status}
                setValue={(value) => setEditableJob({ ...editableJob, status: value as JobStatus })}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-2">
            <button type="submit" className="rounded-md bg-blue-500 p-2 text-white">
              Save Job
            </button>
            <button
              type="button"
              className="rounded-md bg-red-500 p-2 text-white"
              onClick={() => handleToggleModal()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
