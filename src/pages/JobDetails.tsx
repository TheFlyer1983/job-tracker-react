import { useParams, NavLink } from "react-router";
import { useEffect, useState } from "react";
import type { Job } from "../constants/jobs";
import AppHeader from "../components/AppHeader";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs") ?? "[]");

    const foundJob = jobs.find((job: Job) => job.id.toString() === id);

    setJob(foundJob ?? null);
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
