import { jobs } from "./constants/jobs";
import type { Job } from "./constants/jobs";
import { useState } from "react";
import JobList from "./components/JobList";
import AppHeader from "./components/AppHeader";
import SearchBox from "./components/SearchBox";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<Job["status"] | "">("");

  const filteredJobs = jobs
    .filter((job) => statusFilter === '' ||job.status === statusFilter)
    .filter((job) => job.title.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <>
      <AppHeader />
      <SearchBox
        searchText={searchText}
        setSearchText={setSearchText}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <JobList jobs={filteredJobs} />
    </>
  );
}
