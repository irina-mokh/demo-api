type SelectProps = {
  handler: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  value: string,
  options: Array<React.ReactNode>,
  label: string,
};
export const Select = ({ handler, value, options, label }: SelectProps) => {
  return (
    <div className="flex items-center">
      <label htmlFor="block per-page-select mr-3">{label}</label>
      <select
        id="per-page-select"
        className="bg-transparent border-2 border-gray-100 rounded-md p-1"
        onChange={handler}
        value={value}
      >
        {options}
      </select>
    </div>
  );
};
