import type { JobStatus } from "../constants/jobs";
import { jobStatuses } from "../constants/jobs";
import SelectDropdown from "./inputs/SelectDropdown";

type SearchBoxProps = {
  searchText: string;
  setSearchText: (searchText: string) => void;
  statusFilter: JobStatus | "";
  setStatusFilter: (statusFilter: JobStatus | "") => void;
  handleToggleModal: () => void;
};

export default function SearchBox({
  searchText,
  setSearchText,
  statusFilter,
  setStatusFilter,
  handleToggleModal,
}: SearchBoxProps) {
  return (
    <div className="flex flex-row gap-4 justify-between">
      <div className="flex flex-row gap-4">
        <input
          type="text"
          placeholder="Search Jobs"
          className="p-2 mb-4 rounded-md border border-gray-300"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <SelectDropdown options={Array.from(jobStatuses)} value={statusFilter} setValue={(value) => setStatusFilter(value as JobStatus | "")} />
      </div>
      <div className="flex flex-row gap-4">
        <button className="p-2 mb-4 rounded-md border border-gray-300" onClick={handleToggleModal}>
          Add Job
        </button>
      </div>
    </div>
  );
}
