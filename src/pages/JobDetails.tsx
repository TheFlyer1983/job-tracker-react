import { useParams, NavLink } from "react-router";
import { useEffect, useState } from "react";
import type { Job } from "../constants/jobs";
import AppHeader from "../components/AppHeader";
import { getJob } from "../api/jobs";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (!id) return;

    async function loadJob() {
      try {
        const job = await getJob(Number(id));
        setJob(job);
      } catch {
        console.log('Failed to load job');
      }
    }

    loadJob();
  }, [id]);

  return (
    <>
      <AppHeader />
      <NavLink to="/" className="underline mb-4">
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
