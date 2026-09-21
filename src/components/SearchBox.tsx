import type { JobStatus } from '../constants/jobs';
import { jobStatuses } from '../constants/jobs';
import SelectDropdown from './inputs/select/SelectDropdown';
import { Button } from './inputs/button/Button';
import { useModal } from '../hooks/useModal';

type SearchBoxProps = {
  searchText: string;
  setSearchText: (searchText: string) => void;
  statusFilter: JobStatus | '';
  setStatusFilter: (statusFilter: JobStatus | '') => void;
};

export default function SearchBox({
  searchText,
  setSearchText,
  statusFilter,
  setStatusFilter
}: SearchBoxProps) {
  const { openModal } = useModal();

  return (
    <div className="mb-4 flex flex-row items-center justify-between gap-4">
      <div className="flex flex-row gap-4">
        <label htmlFor="search-jobs" className="sr-only">Search Jobs</label>
        <input
          id="search-jobs"
          type="search"
          placeholder="Search Jobs"
          className="rounded-md border border-gray-300 p-2"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <SelectDropdown
          label="Filter by status"
          id="status-filter"
          options={Array.from(jobStatuses)}
          value={statusFilter}
          setValue={(value) => setStatusFilter(value as JobStatus | '')}
        />
      </div>
      <div className="flex flex-row gap-4">
        <Button variant="primary" label="Add Job" onClick={() => openModal({ type: 'add-job' })} />
      </div>
    </div>
  );
}
