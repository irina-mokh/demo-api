import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { selectPosts } from '../store/posts/selectors';
import { getPosts } from '../store/posts/actions';

import { Page } from './Page';
import { Post } from '../components/Post';

export const PostsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector(selectPosts);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const posts = data.map((post) => <Post key={post.id} {...post} />);

  return (
    <Page title="Posts">
      <section>
        <ul className="grid gap-4 items-stretch grid-cols-1 md:grid-cols-2 ">{posts}</ul>
      </section>
    </Page>
  );
};
