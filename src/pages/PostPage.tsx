import { IPost } from 'utils/types';
import Page from './Page';
import { Link, useParams } from 'react-router-dom';
import { selectPosts } from 'entities/post/model/selectors';
import { useSelector } from 'react-redux';
import { CommentList } from 'features/CommentList';

const PostPage = () => {
  const id = useParams().id || 0;
  const { data } = useSelector(selectPosts);
  const post: IPost = data.filter((p) => p.id == id)[0];
  console.log(post);
  return (
    <Page title={`Post: ${id}`}>
      <section>
        <Link to="/posts" className="block text-slate-500 hover:text-slate-50 mb-4">
          &#10094; Back to posts
        </Link>
        <p className="text-2xl text-teal-600 font-semibold mb-4">{post.userName}</p>
        <h3 className="text-3xl font-bold mb-6">{post.title}</h3>
        <p className="text-lg mb-6">{post.body}</p>
        <CommentList id={post.id} show={true} />
      </section>
    </Page>
  );
};

export default PostPage;
