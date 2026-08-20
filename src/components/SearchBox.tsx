import type { JobStatus } from '../constants/jobs';
import { jobStatuses } from '../constants/jobs';
import SelectDropdown from './inputs/SelectDropdown';
import { Button } from './inputs/button/Button';

type SearchBoxProps = {
  searchText: string;
  setSearchText: (searchText: string) => void;
  statusFilter: JobStatus | '';
  setStatusFilter: (statusFilter: JobStatus | '') => void;
  handleToggleModal: (string: string) => void;
};

export default function SearchBox({
  searchText,
  setSearchText,
  statusFilter,
  setStatusFilter,
  handleToggleModal
}: SearchBoxProps) {
  return (
    <div className="flex flex-row justify-between gap-4 items-center mb-4 ">
      <div className="flex flex-row gap-4">
        <input
          type="text"
          placeholder="Search Jobs"
          className="rounded-md border border-gray-300 p-2"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <SelectDropdown
          options={Array.from(jobStatuses)}
          value={statusFilter}
          setValue={(value) => setStatusFilter(value as JobStatus | '')}
        />
      </div>
      <div className="flex flex-row gap-4">
        <Button variant="primary" label="Add Job" onClick={() => handleToggleModal('addJob')} />
      </div>
    </div>
  );
}
