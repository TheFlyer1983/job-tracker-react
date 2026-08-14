import { jobs } from "./constants/jobs";
import type { Job } from "./constants/jobs";
import { useState } from "react";
import JobList from "./components/JobList";
import AppHeader from "./components/AppHeader";
import SearchBox from "./components/SearchBox";
import AddJob from "./components/AddJob";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<Job["status"] | "">("");
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [allJobs, setAllJobs] = useState(jobs)

  const handleToggleModal = () => {
    console.log('Add job');
    setIsModalOpen(!isModalOpen)
  }

  const handleAddJob = (job: Partial<Job>) => {
    console.log('Add job', job);
    setIsModalOpen(false)

    setAllJobs([...allJobs, { id: allJobs.length + 1, ...job, status: 'Saved' } as Job])
  }

  const filteredJobs = allJobs
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
        handleToggleModal={handleToggleModal}
      />
      <JobList jobs={filteredJobs} />

      { isModalOpen && <AddJob handleAddJob={handleAddJob} handleToggleModal={handleToggleModal} />}
    </>
  );
}
