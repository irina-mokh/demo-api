type SelectProps = {
  handler: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  value?: string,
  options: Array<React.ReactNode>,
  label: string,
  multiple?: boolean,
};
export const Select = ({ handler, value, options, label, multiple }: SelectProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="per-page-select">{label}</label>
      <select
        id="per-page-select"
        multiple={multiple}
        className="bg-transparent border-2 border-gray-100 rounded-md p-1 child:bg-slate-700 child:text-gray-200"
        onChange={handler}
        value={value}
      >
        {options}
      </select>
    </div>
  );
};
