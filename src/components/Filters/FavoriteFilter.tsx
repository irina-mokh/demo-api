import { useDispatch } from 'react-redux';

import { AppDispatch, HANDLERS } from '../../store';
import { Pages } from '../../utils/types';
import { useLocation } from 'react-router-dom';

export const FavoriteFilter = () => {
  const dispatch: AppDispatch = useDispatch();
  // eslint-disable-next-line prettier/prettier
  const page = useLocation().pathname.slice(1) as Pages;

  const ls = localStorage.getItem('reduxState');
  const value = ls ? JSON.parse(ls)[page].filter.favorite : '';
  const handler = HANDLERS[page].favorite;

  const handleFilterByFavorite = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handler({ prop: 'favorite', value: e.target.checked }));
  };

  return (
    <div className="flex items-center flex-col">
      <label htmlFor="posts-favorite-filter">Favorite: </label>
      <input
        type="checkbox"
        id="posts-favorite-filter"
        checked={value}
        onChange={handleFilterByFavorite}
        className="w-5  h-5 accent-teal-500"
      ></input>
    </div>
  );
};
