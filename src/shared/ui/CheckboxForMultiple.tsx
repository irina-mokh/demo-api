type CheckboxForMultipleSelectProps = {
  handleSelect: (v: boolean) => void,
};
export const CheckboxForMultiple = ({ handleSelect }: CheckboxForMultipleSelectProps) => {
  return (
    <input
      type="checkbox"
      defaultChecked={false}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        handleSelect(e.target.checked);
      }}
      className="absolute top-2 right-2 bg-transparent border-gray-100 accent-teal-500 w-4 h-4"
    ></input>
  );
};
