import { initialJobs } from "../constants/jobs";
import type { Job } from "../constants/jobs";
import { useState, useEffect } from "react";
import JobList from "../components/JobList";
import AppHeader from "../components/AppHeader";
import SearchBox from "../components/SearchBox";
import AddJobModal from "../components/AddJobModal";
import EditJobModal from "../components/EditJobModal";

export default function JobTracker() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<Job["status"] | "">("");
  const [modalName, setModalName] = useState<string | null>(null);
  const [allJobs, setAllJobs] = useState<Job[]>(() => {
    const savedJobs = localStorage.getItem("jobs");

    return savedJobs ? JSON.parse(savedJobs) : initialJobs;
  });
  const [editableJob, setEditableJob] = useState<Job | null>(null);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(allJobs));
  }, [allJobs]);

  const handleToggleModal = (modalName: string | null = null) => {
    setModalName(modalName);
  };

  const handleAddJob = (job: Partial<Job>) => {
    setModalName(null);

    setAllJobs([...allJobs, { id: allJobs.length + 1, ...job } as Job]);
  };

  const filteredJobs = allJobs
    .filter((job) => statusFilter === "" || job.status === statusFilter)
    .filter((job) => job.title.toLowerCase().includes(searchText.toLowerCase()));

  const editJob = (job: Job) => {
    setModalName("editJob");
    setEditableJob(job);
  };

  const saveJob = (job: Job) => {
    setModalName(null);

    setAllJobs((currentJobs) => currentJobs.map((j) => (j.id === job.id ? job : j)));
    setEditableJob(null);
  };

  const deleteJob = (job: Job) => {
    setAllJobs((currentJobs) => currentJobs.filter((j) => j.id !== job.id));
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
        <JobList jobs={filteredJobs} editJob={editJob} deleteJob={deleteJob} />
      </div>

      {modalName === "addJob" && (
        <AddJobModal handleAddJob={handleAddJob} handleToggleModal={handleToggleModal} />
      )}

      {modalName === "editJob" && editableJob && (
        <EditJobModal
          editableJob={editableJob}
          setEditableJob={setEditableJob}
          saveJob={saveJob}
          handleToggleModal={handleToggleModal}
        />
      )}
    </>
  );
}
