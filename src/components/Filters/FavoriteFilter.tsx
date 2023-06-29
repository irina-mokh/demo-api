import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../store';
import { changeFilter } from '../../store/posts/reducer';
import { selectPosts } from '../../store/posts/selectors';

export const FavoriteFilter = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    filter: { favorite },
  } = useSelector(selectPosts);
  const handleFilterByFavorite = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilter({ prop: 'favorite', value: e.target.checked }));
  };

  return (
    <div className="flex items-center flex-col">
      <label htmlFor="posts-favorite-filter">Favorite: </label>
      <input
        type="checkbox"
        id="posts-favorite-filter"
        checked={favorite}
        onChange={handleFilterByFavorite}
        className="w-5  h-5 accent-teal-500"
      ></input>
    </div>
  );
};
