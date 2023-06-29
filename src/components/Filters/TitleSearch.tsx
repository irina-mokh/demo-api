import { useDispatch } from 'react-redux';

import { AppDispatch, HANDLERS } from '../../store';
import { useLocation } from 'react-router-dom';
import { Pages } from '../../utils/types';

export const TitleSearch = () => {
  const dispatch: AppDispatch = useDispatch();
  // eslint-disable-next-line prettier/prettier
  const page = useLocation().pathname.slice(1) as Pages;

  const ls = localStorage.getItem('reduxState');
  const value =  ls ? JSON.parse(ls)[page].filter.title : '';
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
