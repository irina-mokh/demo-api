import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { filterPosts, setPostsPerPage } from '../store/posts/reducer';
import { selectPosts } from '../store/posts/selectors';
import { useLocation } from 'react-router-dom';
import { FilterType, IPost, ISelectSelector, Pages, SelectE } from '../utils/types';
import { Select } from './Select';
import { filterPhotos } from '../store/photos/reducer';
import { filterTasks } from '../store/tasks/reducer';
import { selectTasks } from '../store/tasks/selectors';
import { selectPhotos } from '../store/photos/selectors';

type FilterProps = {
  // eslint-disable-next-line prettier/prettier
  prop: FilterType;
};
export const Filter = ({ prop }: FilterProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector(selectPosts);
  const options = new Set(data.map((post) => post[prop]));
  // eslint-disable-next-line prettier/prettier
  const page = useLocation().pathname.slice(1) as Pages;

  const filterSelector: ISelectSelector = {
    posts: {
      value: useSelector(selectPosts).perPage,
      handler: (e: SelectE) => dispatch(filterPosts(e.target.value)),
    },
    photos: {
      value: useSelector(selectPhotos).perPage,
      handler: (e: SelectE) => dispatch(filterPhotos(e.target.value)),
    },
    tasks: {
      value: useSelector(selectTasks).perPage,
      handler: (e: SelectE) => dispatch(filterTasks(e.target.value)),
    },
  };

  const optionsElements = Array.from(options).map((opt) => (
    <option key={String(opt)} className="bg-slate-600" value={String(opt)}>
      {opt}
    </option>
  ));

  return <Select label={`by ${prop}`} options={optionsElements} {...filterSelector[page]}/>;
};
