import cn from 'classnames';
import { editPost } from 'entities/post/model/reducer';
import { selectPosts } from 'entities/post/model/selectors';
import { Post } from 'entities/post/ui/Post';
import { CommentList } from 'features/CommentList';
import { AddPostToFav } from 'features/addPostToFav';
import { DeletePost } from 'features/deletePost';
import { EditBtns } from 'features/editBtns';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CheckboxForMultiple } from 'shared/ui/CheckboxForMultiple';
import { IconBtn } from 'shared/ui/IconBtn';
import { IPost } from 'utils/types';

type PostWidgetProps = {
  id: number,
  handleSelect: (v: boolean) => void,
};

export const PostWidget = ({ id, handleSelect }: PostWidgetProps) => {
  const { data } = useSelector(selectPosts);
  const post = data.filter((p: IPost) => p.id === id)[0];

  const [isEditable, setIsEditable] = useState(false);

  // Edit post: share state between btns and post
  const [postEdit, setPostEdit] = useState(post);
  useEffect(() => {
    setPostEdit(post);
  }, [post]);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    prop: string
  ) => {
    setPostEdit({ ...postEdit, [prop]: e.target.value });
  };

  // COMMENTS: share state between btn and list od comments
  const [showComments, setShowComments] = useState(false);
  const onCommentBtn = () => {
    setShowComments(!showComments);
  };

  const postClasses = cn({
    'post relative bg-gray-700 bg-opacity-20 p-4 rounded-md h-full flex flex-col justify-between':
      true,
    'md:col-span-2': showComments,
  });

  return (
    <li className={postClasses}>
      <article className="content flex flex-col justify-between h-full">
        <Post postEdit={postEdit} isEditable={isEditable} handlePostChange={handleTextChange} />
        {/* post buttons */}
        <div className="controls flex justify-end mx-2 my-1">
          <EditBtns
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            handler={editPost}
            current={postEdit}
            setCurrent={setPostEdit}
            initial={post}
          />
          <AddPostToFav post={post} />
          <DeletePost {...post} />
          <IconBtn type="comments" isActive={showComments} handler={onCommentBtn} />
        </div>
      </article>
      <CommentList id={id} show={showComments} />
      <CheckboxForMultiple handleSelect={handleSelect} />
    </li>
  );
};
