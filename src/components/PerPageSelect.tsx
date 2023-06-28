import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { setPostsPerPage } from '../store/posts/reducer';
import { selectPosts } from '../store/posts/selectors';
import { useLocation } from 'react-router-dom';
import { ISelectSelector, Pages, SelectE } from '../utils/types';
import { selectPhotos } from '../store/photos/selectors';
import { selectTasks } from '../store/tasks/selectors';
import { setTasksPerPage } from '../store/tasks/reducer';
import { setPhotosPerPage } from '../store/photos/reducer';
import { Select } from './Select';

const PER_PAGE_OPTIONS = [10, 20, 50, 100, 'all'];

export const PerPageSelect = () => {
  // eslint-disable-next-line prettier/prettier
  const page = useLocation().pathname.slice(1) as Pages;
  const dispatch: AppDispatch = useDispatch();

  const perPageSelector: ISelectSelector = {
    posts: {
      value: useSelector(selectPosts).perPage,
      handler: (e: SelectE) =>
        dispatch(setPostsPerPage(e.target.value)),
    },
    photos: { value: useSelector(selectPhotos).perPage, handler: (e: SelectE) =>
        dispatch(setPhotosPerPage(e.target.value)) },
    tasks: { value: useSelector(selectTasks).perPage, handler: (e: SelectE ) =>
			dispatch(setTasksPerPage(e.target.value)) },
  };

  const options = PER_PAGE_OPTIONS.map((opt) => (
    <option key={opt} value={opt}>
      {opt}
    </option>
  ));

  return (
    <Select label="Per page:"  options={options} {...perPageSelector[page]}/>
  );
};
