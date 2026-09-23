type SelectDropdownProps = {
  label: string;
  id: string;
  options: string[];
  value: string;
  setValue: (status: string) => void;
  className?: string;
  labelClassName?: string;
};

export default function SelectDropdown({
  label,
  id,
  options,
  value,
  setValue,
  className,
  labelClassName
}: SelectDropdownProps) {
  return (
    <>
      <label htmlFor={id} className={labelClassName ?? 'sr-only'}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        className={`rounded-md border border-gray-300 p-2 text-gray-400 ${className ?? ''}`}
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
    </>
  );
}
