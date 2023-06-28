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
import { filterPosts } from '../store/posts/reducer';
import { TitleSearch } from '../components/Filters/TitleSearch';

export const PostsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, perPage, display, filter } = useSelector(selectPosts);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!data.length) {
      dispatch(getPosts());
    }
  }, []);

  useEffect(() => {
    dispatch(filterPosts());
  }, [filter]);

  let postsPerPage = display;
  if (perPage !== 'all') {
    postsPerPage = display.slice(page * +perPage, +perPage * (page + 1));
  }
  const postElems = postsPerPage.map((post) => <Post key={post.id} id={post.id} />);

  return (
    <Page title="Posts">
      <form>
        <legend className="text-lg">Filters:</legend>
        <fieldset className="flex justify-between py-4">
          <TitleSearch />
          <UserFilter />
          <FavoriteFilter />
          <PerPageSelect />
        </fieldset>
      </form>
      {/* <Sort /> */}
      <section>
        <ul className="grid gap-4 items-stretch grid-cols-1 md:grid-cols-2 ">{postElems}</ul>
      </section>
    </Page>
  );
};
