type SelectDropdownProps = {
  options: string[];
  value: string;
  setValue: (status: string) => void;
  className?: string;
};

export default function SelectDropdown({ options, value, setValue, className }: SelectDropdownProps) {
  return (
    <select
      value={value}
      className={`rounded-md border border-gray-300 p-2 ${className ?? ''}`}
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
