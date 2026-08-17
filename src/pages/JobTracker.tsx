import type { Job } from "../constants/jobs";
import { useState, useEffect } from "react";
import JobList from "../components/JobList";
import AppHeader from "../components/AppHeader";
import SearchBox from "../components/SearchBox";
import AddJobModal from "../components/AddJobModal";
import EditJobModal from "../components/EditJobModal";
import { useJobs } from "../hooks/useJobs";

export default function JobTracker() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<Job["status"] | "">("");
  const [modalName, setModalName] = useState<string | null>(null);

  const { jobs: allJobs } = useJobs();

  const [editableJob, setEditableJob] = useState<Job | null>(null);

  const handleToggleModal = (modalName: string | null = null) => {
    setModalName(modalName);
  };

  const filteredJobs = allJobs
    .filter((job) => statusFilter === "" || job.status === statusFilter)
    .filter((job) => job.title.toLowerCase().includes(searchText.toLowerCase()));

  const editJob = (job: Job) => {
    setModalName("editJob");
    setEditableJob(job);
  };

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

      <div className="w-full overflow-x-auto">
        <JobList jobs={filteredJobs} editJob={editJob} />
      </div>

      {modalName === "addJob" && (
        <AddJobModal handleToggleModal={handleToggleModal} />
      )}

      {modalName === "editJob" && editableJob && (
        <EditJobModal
          editableJob={editableJob}
          setEditableJob={setEditableJob}
          handleToggleModal={handleToggleModal}
        />
      )}
    </>
  );
}
