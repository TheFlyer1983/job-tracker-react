import type { JobStatus } from '../constants/jobs';
import { useState } from 'react';
import JobList from '../components/JobList';
import AppHeader from '../components/AppHeader';
import SearchBox from '../components/SearchBox';
import { useJobs } from '../hooks/useJobs';

export default function JobTracker() {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<JobStatus | ''>('');

  const { jobs: allJobs } = useJobs();

  const filteredJobs = allJobs
    .filter((job) => statusFilter === '' || job.status === statusFilter)
    .filter((job) => job.title.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <main className="w-full overflow-x-auto">
      <AppHeader />
      <SearchBox
        searchText={searchText}
        setSearchText={setSearchText}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <JobList jobs={filteredJobs} />
    </main>
  );
}
