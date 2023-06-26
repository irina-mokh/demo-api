import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { selectPosts } from '../store/posts/selectors';
import { getPosts } from '../store/posts/actions';

import { Page } from './Page';

export const PostsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector(selectPosts);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const posts = data.map((post) => (
    <li key={post.id} className="p-3">
      <h3 className="font-bold">{post.title}</h3>
      {post.body}
    </li>
  ));

  return (
    <Page title="Posts">
      <section>
        <ul>{posts}</ul>
      </section>
    </Page>
  );
};
