import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { setPostsPerPage } from '../store/posts/reducer';
import { selectPosts } from '../store/posts/selectors';
import { useEffect } from 'react';

const PER_PAGE_OPTIONS = [10, 20, 50, 100, 'all'];

type PerPageSelectProps = {
  page: string,
};
export const PerPageSelect = ({ page }: PerPageSelectProps) => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector(selectPosts).perPage;
  // const photos = useSelector(selectPhotos).perPage;
  // const tasks = useSelector(selectTAsks).perPage;

  let value = 10;
  switch (page) {
    case 'posts':
      value = posts;
      break;
    case 'photos':
      // value = posts;
      break;
    case 'tasks':
      // value = posts;
      break;
  }
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);
    switch (page) {
      case 'posts':
        dispatch(setPostsPerPage(e.target.value));
        break;
      case 'photos':
      // dispatch(setPhotosPerPage(e.target.value));
      case 'tasks':
      // dispatch(setTasksPerPage(e.target.value));
    }
  };
  const options = PER_PAGE_OPTIONS.map((opt) => (
    <option key={opt} className="bg-slate-600" value={opt}>
      {opt}
    </option>
  ));

  console.log(value);
  return (
    <div>
      <label htmlFor="per-page-select">Per page:</label>
      <select id="per-page-select" className="bg-transparent" onChange={handleChange} value={value}>
        {options}
      </select>
    </div>
  );
};
