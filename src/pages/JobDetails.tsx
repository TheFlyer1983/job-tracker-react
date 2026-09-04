import { useParams, NavLink } from 'react-router';
import { useEffect, useState } from 'react';
import type { Job } from '../constants/jobs';
import AppHeader from '../components/AppHeader';
import { getJob } from '../api/jobs';
import { useNotifications } from '../hooks/useNotifications';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const { addNotification } = useNotifications();
  useEffect(() => {
    async function loadJob() {
      if (!id) return;

      try {
        const job = await getJob(id);
        setJob(job);
      } catch {
        addNotification({
          type: 'error',
          message: 'Failed to load job'
        });
      }
    }

    loadJob();
  }, [id, addNotification]);

  return (
    <>
      <AppHeader />
      <NavLink to="/" className="mb-4 underline">
        Back to Jobs
      </NavLink>
      <p>Job ID: {id}</p>
      <div>{job?.title}</div>
      <div>{job?.company}</div>
      <div>{job?.location}</div>
      <div>{job?.notes}</div>
      <div>{job?.status}</div>
    </>
  );
}
