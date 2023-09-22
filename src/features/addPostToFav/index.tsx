import { AppDispatch } from 'app/store';
import { editPost } from 'entities/post/model/reducer';
import { useDispatch } from 'react-redux';
import { IconBtn } from 'shared/ui/IconBtn';
import { IPost } from 'shared/utils/types';

type AddPostToFavProps = {
  post: IPost,
};

export const AddPostToFav = ({ post }: AddPostToFavProps) => {
  const dispatch: AppDispatch = useDispatch();

  const toggleFav = () => {
    dispatch(editPost({ ...post, favorite: !post.favorite }));
  };
  return <IconBtn type="favorite" isActive={post.favorite} handler={toggleFav} />;
};
