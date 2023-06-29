import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { selectPosts } from '../store/posts/selectors';
import { getPosts } from '../store/posts/actions';

import { Page } from './Page';
import { Post } from '../components/Post';
import { PerPageSelect } from '../components/PerPageSelect';
import { UserFilter } from '../components/Filters/UserFilter';
import { FavoriteFilter } from '../components/Filters/FavoriteFilter';
import { changeSortType, filterPosts, sortPosts } from '../store/posts/reducer';
import { TitleSearch } from '../components/Filters/TitleSearch';
import { Select } from '../components/Select';
import { POST_SORT_OPTIONS } from '../utils';
import { Btn } from '../components/Btn';
import { AddPostForm } from '../components/AddPostForm';
import { selectUsers } from '../store/users/selectors';
import { getUsers } from '../store/users/actions';

export const PostsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, perPage, display, filter, sort } = useSelector(selectPosts);
  const { data: users } = useSelector(selectUsers);
  const [page, setPage] = useState(0);

  const [isAddForm, setIsAddForm] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (!data.length) {
      dispatch(getPosts(users));
    }
  }, [users]);

  // filter posts
  useEffect(() => {
    dispatch(filterPosts());
  }, [filter, data]);

  // sort posts
  useEffect(() => {
    dispatch(sortPosts());
  }, [sort, filter, data]);

  // display post depending on page settings
  let postsPerPage = display;
  console.log(display);
  if (perPage !== 'all') {
    postsPerPage = display.slice(page * +perPage, +perPage * (page + 1));
  }
  const postElems = postsPerPage.map((post) => <Post key={post.id} id={post.id} />);

  // sort
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeSortType(e.target.value));
  };

  const sortOptions = POST_SORT_OPTIONS.map((opt) => (
    <option key={opt.name} value={String(opt.name)}>
      {opt.name}
    </option>
  ));

  return (
    <Page title="Posts">
      <form className="rounded-md bg-gray-900 bg-opacity-40 text-gray-400 px-4 py-2">
        <legend className="visually-hidden text-lg">Filters:</legend>
        <fieldset className="flex justify-between flex-wrap py-1">
          <TitleSearch />
          <UserFilter />
          <Select handler={handleSortChange} value={sort} label="Sort by:" options={sortOptions} />
          <FavoriteFilter />
          <PerPageSelect />
        </fieldset>
      </form>
      <div className="flex justify-end mt-2">
        <Btn text="Add post" handler={() => setIsAddForm(true)} />
      </div>
      <section>
        <ul className="grid gap-4 items-stretch grid-cols-1 md:grid-cols-2 mt-5">{postElems}</ul>
      </section>
      {isAddForm && <AddPostForm close={() => setIsAddForm(false)} />}
    </Page>
  );
};
