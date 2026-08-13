import type { Job } from "../constants/jobs";

type SearchBoxProps = {
  searchText: string;
  setSearchText: (searchText: string) => void;
  statusFilter: Job["status"] | "";
  setStatusFilter: (statusFilter: Job["status"] | "") => void;
};

export default function SearchBox({
  searchText,
  setSearchText,
  statusFilter,
  setStatusFilter,
}: SearchBoxProps) {
  return (
    <div className="flex flex-row gap-4">
      <input
        type="text"
        placeholder="Search Jobs"
        className="p-2 mb-4 rounded-md border border-gray-300"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <select
        value={statusFilter}
        className="p-2 mb-4 rounded-md border border-gray-300"
        onChange={(e) => setStatusFilter(e.target.value as Job["status"] | "")}
      >
        <option value="">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
}
