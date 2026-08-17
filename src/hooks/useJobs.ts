// import { useState } from "react";
// import type { Job } from "../constants/jobs";

// export default function useJobs() {
//   const [allJobs, setAllJobs] = useState<Job[]>([]);

//   function addJob(job: Partial<Job>) {
//     setModalName(null);

//     setAllJobs([...allJobs, { id: allJobs.length + 1, ...job } as Job]);
//   };

//   function deleteJob(job: Job) {
//     setAllJobs((currentJobs) => currentJobs.filter((j) => j.id !== job.id));
//   };

//   function saveJob(job: Job) {
//     setModalName(null);

//     setAllJobs((currentJobs) => currentJobs.map((j) => (j.id === job.id ? job : j)));
//     setEditableJob(null);
//   };

//   return {
//     addJob,
//     deleteJob,
//     saveJob
//   }
// }

import { useContext } from 'react'
import { JobContext } from '../contexts/JobContext'

export function useJobs() {
  const context = useContext(JobContext)

  if (!context) {
    throw new Error('useJobs must be used within a JobProvider')
  }

  return context
}