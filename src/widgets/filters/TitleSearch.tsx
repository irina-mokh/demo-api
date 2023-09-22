import { useDispatch } from 'react-redux';

import { AppDispatch, HANDLERS } from 'app/store';
import { useLS, usePage } from 'utils/hooks';

export const TitleSearch = () => {
  const dispatch: AppDispatch = useDispatch();
  const page = usePage();
  const value = useLS()[page].filter.title;
  const handler = HANDLERS[page].title;

  const handleTitleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handler({ prop: 'title', value: e.target.value }));
  };
  return (
    <div className="flex flex-col">
      <label htmlFor="title-search">Find by title:</label>
      <input
        id="title-search"
        onChange={handleTitleSearch}
        value={value}
        className="max-w-[250px] bg-transparent border-2 border-gray-100 rounded-md p-1"
      />
    </div>
  );
};
