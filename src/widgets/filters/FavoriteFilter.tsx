import { useDispatch } from 'react-redux';

import { AppDispatch, HANDLERS } from 'app/store';
import { useLS, usePage } from 'shared/utils/hooks';

export const FavoriteFilter = () => {
  const dispatch: AppDispatch = useDispatch();
  const page = usePage();
  const value = useLS()[page].filter.favorite;
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
