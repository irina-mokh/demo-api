import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { selectPosts } from '../store/posts/selectors';
import { getPosts } from '../store/posts/actions';

import { Page } from './Page';
import { Post } from '../components/Post';
import { PerPageSelect } from '../components/PerPageSelect';

export const PostsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, perPage } = useSelector(selectPosts);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem('reduxState')) {
      dispatch(getPosts());
    }
  }, []);

  const posts = data
    .slice(page * +perPage, +perPage * (page + 1))
    .map((post) => <Post key={post.id} {...post} />);

  return (
    <Page title="Posts">
      <PerPageSelect page="posts" />
      <section>
        <ul className="grid gap-4 items-stretch grid-cols-1 md:grid-cols-2 ">{posts}</ul>
      </section>
    </Page>
  );
};
