type SelectDropdownProps = {
  id: string;
  options: string[];
  value: string;
  setValue: (status: string) => void;
  className?: string;
};

export default function SelectDropdown({
  id,
  options,
  value,
  setValue,
  className
}: SelectDropdownProps) {
  return (
    <select
      id={id}
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
