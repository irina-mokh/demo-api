import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { setPostsPerPage } from '../store/posts/reducer';
import { selectPosts } from '../store/posts/selectors';
import { useLocation } from 'react-router-dom';
import { IPerPageSelector, Pages } from '../utils/types';

const PER_PAGE_OPTIONS = [10, 20, 50, 100, 'all'];
type SelectE = React.ChangeEvent<HTMLSelectElement>;
export const PerPageSelect = () => {
  // eslint-disable-next-line prettier/prettier
  const page = useLocation().pathname.slice(1) as Pages;
  const dispatch: AppDispatch = useDispatch();

  const pageSelector: IPerPageSelector = {
    posts: {
      value: useSelector(selectPosts).perPage,
      handler: (e: SelectE) =>
        dispatch(setPostsPerPage(e.target.value)),
    },
    // photos: { value: useSelector(selectPhotos).perPage, handler: (e: ) =>
    //     dispatch(setPhotosPerPage(e.target.value)), },
    // tasks: { value: useSelector(selectTasks).perPage, handler: (e: ) =>
		// 	dispatch(setTasksPerPage(e.target.value)), },
  };
  const value = pageSelector[page]?.value;

  const options = PER_PAGE_OPTIONS.map((opt) => (
    <option key={opt} className="bg-slate-600" value={opt}>
      {opt}
    </option>
  ));

  return (
    <div>
      <label htmlFor="per-page-select">Per page:</label>
      <select
        id="per-page-select"
        className="bg-transparent"
        onChange={pageSelector[page]?.handler}
        value={value}
      >
        {options}
      </select>
    </div>
  );
};
