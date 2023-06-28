import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { selectPosts } from '../store/posts/selectors';
import { getPosts } from '../store/posts/actions';

import { Page } from './Page';
import { Post } from '../components/Post';
import { PerPageSelect } from '../components/PerPageSelect';
import { Filter } from '../components/Filter';
import { Select } from '../components/Select';
import { UserFilter } from '../components/Filters/UserFilter';

export const PostsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, perPage, display } = useSelector(selectPosts);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!data.length) {
      dispatch(getPosts());
    }
  }, []);

  let postsPerPage = display;
  if (perPage !== 'all') {
    postsPerPage = display.slice(page * +perPage, +perPage * (page + 1));
  }
  const postElems = postsPerPage.map((post) => <Post key={post.id} {...post} />);

  return (
    <Page title="Posts">
      <PerPageSelect />
      <UserFilter />
      <Filter prop="title" />
      <Filter prop="favorite" />
      {/* <Sort /> */}
      <section>
        <ul className="grid gap-4 items-stretch grid-cols-1 md:grid-cols-2 ">{postElems}</ul>
      </section>
    </Page>
  );
};
