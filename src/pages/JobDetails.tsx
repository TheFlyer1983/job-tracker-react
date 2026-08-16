import { useParams, NavLink } from "react-router";

export default function JobDetails() {
  const { id } = useParams();
  return (
    <>
      <NavLink to="/" className="underline mb-4">
        Back to Jobs
      </NavLink>
      <h1>Job Details</h1>
      <p>Job ID: {id}</p>
    </>
  );
}
