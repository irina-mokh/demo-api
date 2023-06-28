import { useDispatch, useSelector } from 'react-redux';
import { Select } from '../Select';
import { selectPosts } from '../../store/posts/selectors';
import { AppDispatch } from '../../store';
import { changeFilter } from '../../store/posts/reducer';

export const TitleSearch = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    filter: { title },
  } = useSelector(selectPosts);

  const handleTitleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilter({ prop: 'title', value: e.target.value }));
  };
  return (
    <div className="flex flex-col">
      <label htmlFor="title-search">Find by title:</label>
      <input
        id="title-search"
        onChange={handleTitleSearch}
        value={title}
        className="bg-transparent border-2 border-gray-100 rounded-md p-1"
      />
    </div>
  );
};
