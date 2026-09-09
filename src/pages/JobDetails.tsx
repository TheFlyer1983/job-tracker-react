import { useParams, NavLink, useNavigate } from 'react-router';
import { useEffect } from 'react';
import AppHeader from '../components/AppHeader';
import { getJob } from '../api/jobs';
import { useNotifications } from '../hooks/useNotifications';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../components/inputs/button/Button';
import { useModal } from '../hooks/useModal';
import { useJobs } from '../hooks/useJobs';

const statusClasses = {
  Saved: 'bg-slate-100 text-slate-700',
  Applied: 'bg-blue-100 text-blue-700',
  Interview: 'bg-emerald-100 text-emerald-700',
  Offer: 'bg-amber-100 text-amber-800',
  Rejected: 'bg-red-100 text-red-700',
  '': 'bg-slate-100 text-slate-600'
};

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: job,
    isError,
    isPending
  } = useQuery({
    queryKey: ['jobs', id],
    queryFn: () => getJob(id!)
  });
  const { addNotification } = useNotifications();
  const { deleteJob } = useJobs();
  const { openModal } = useModal();

  useEffect(() => {
    if (isError) {
      addNotification({
        type: 'error',
        message: 'Failed to load job'
      });
    }
  }, [isError, addNotification]);

  function handleDeleteJob() {
    if (!job) return;

    deleteJob(job.id, {
      onSuccess: () => navigate('/')
    });
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-4xl py-8">
        <NavLink
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <span aria-hidden="true">&larr;</span>
          Back to jobs
        </NavLink>

        {isPending && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-slate-500 shadow-sm">
            Loading job details...
          </div>
        )}

        {isError && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-8 text-red-700">
            This job could not be loaded.
          </div>
        )}

        {job && (
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm">
            <header className="border-b border-slate-200 p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="mb-2 text-sm font-medium text-slate-500">{job.company}</p>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                    {job.title}
                  </h2>
                </div>

                <span
                  className={`${statusClasses[job.status]} w-fit rounded-full px-3 py-1 text-sm font-semibold`}
                >
                  {job.status || 'No status'}
                </span>
              </div>
            </header>

            <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
              <section>
                <h3 className="mb-1 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Location
                </h3>
                <p className="text-base text-slate-900">{job.location || 'Not specified'}</p>
              </section>

              <section>
                <h3 className="mb-1 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Salary
                </h3>
                <p className="text-base text-slate-900">{job.salary || 'Not specified'}</p>
              </section>

              <section className="sm:col-span-2">
                <h3 className="mb-1 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Job listing
                </h3>
                {job.url ? (
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all text-blue-600 underline decoration-blue-200 underline-offset-4 hover:text-blue-800"
                  >
                    {job.url}
                  </a>
                ) : (
                  <p className="text-slate-500">No link provided</p>
                )}
              </section>

              <section className="sm:col-span-2">
                <h3 className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Notes
                </h3>
                <div className="min-h-28 rounded-lg bg-slate-50 p-4 leading-7 text-slate-700">
                  {job.notes || 'No notes added yet.'}
                </div>
              </section>
            </div>

            <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="truncate text-xs text-slate-400">Job ID: {job.id}</p>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  label="Edit job"
                  onClick={() => openModal({ type: 'edit-job', job })}
                />
                <Button
                  type="button"
                  variant="danger"
                  label="Delete job"
                  onClick={handleDeleteJob}
                />
              </div>
            </footer>
          </article>
        )}
      </main>
    </>
  );
}
