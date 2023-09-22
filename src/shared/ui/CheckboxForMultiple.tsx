type CheckboxForMultipleSelectProps = {
  handleSelect: (v: boolean) => void,
  isChecked: boolean,
};
export const CheckboxForMultiple = ({
  handleSelect,
  isChecked,
}: CheckboxForMultipleSelectProps) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        handleSelect(e.target.checked);
      }}
      className="absolute top-2 right-2 bg-transparent border-gray-100 accent-teal-500 w-4 h-4"
    ></input>
  );
};
