type SelectDropdownProps = {
  options: string[];
  value: string;
  setValue: (status: string) => void;
};

export default function SelectDropdown({ options, value, setValue }: SelectDropdownProps) {
  return (
    <select
      value={value}
      className="mb-4 rounded-md border border-gray-300 p-2"
      onChange={(e) => setValue(e.target.value)}
    >
      <option value="">All</option>
      {options.map((option) => {
        return (
          <option value={option} key={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}
