type SelectProps = {
  handler: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  value: string,
  options: Array<React.ReactNode>,
  label: string,
};
export const Select = ({ handler, value, options, label }: SelectProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="per-page-select">{label}</label>
      <select
        id="per-page-select"
        className="bg-transparent border-2 border-gray-100 rounded-md p-1 child:bg-slate-600"
        onChange={handler}
        value={value}
      >
        {options}
      </select>
    </div>
  );
};
