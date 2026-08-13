import type { Job } from "../constants/jobs";
import JobCard from "./JobCard";

type JobListProps = {
  jobs: Job[];
};

export default function JobList({ jobs }: JobListProps) {
  const columns: Record<string, React.ReactNode[]> = {};

  for (const job of jobs) {
    if (job.status in columns) {
      columns[job.status].push(<JobCard job={job} key={job.id} />);
    } else {
      columns[job.status] = [<JobCard job={job} key={job.id} />];
    }
  }

  return (
    <>
      <div className="flex flex-row gap-4 max-w-full">
        {Object.keys(columns).map((column) => {
          return (
            <div className="flex flex-col gap-4 bg-white p-4 rounded" key={column}>
              <h2 className="text-2xl font-bold text-black text-center">{column}</h2>
              {columns[column]}
            </div>
          )
        })}
      </div>
    </>
  );
}
