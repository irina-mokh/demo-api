type FiltersProps = {
  children: React.ReactNode,
};
export const Filters = ({ children }: FiltersProps) => {
  return (
    <form className="flex rounded-md bg-gray-900 bg-opacity-40 text-gray-400 px-4 py-2">
      <legend className="visually-hidden text-lg">Filters:</legend>
      <fieldset className="flex flex-wrap py-1 w-full justify-between child:m-2">
        {children}
      </fieldset>
    </form>
  );
};
