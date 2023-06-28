import { useEffect, useState } from 'react';
import { IComment, IPost } from '../utils/types';
import { api } from '../utils/axios';
import { IconBtn } from './IconBtn';
import cn from 'classnames';
import { Comment } from './Comment';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { deletePost, editPost } from '../store/posts/reducer';
import { Modal } from './Modal';
import { ConfirmDialog } from './ConfirmDialog';

export const Post = (props: IPost) => {
  const { userId, id, favorite } = props;
  const dispatch: AppDispatch = useDispatch();

  const [comments, setComments] = useState<Array<IComment>>([]);
  const [showComments, setShowComments] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const [isDialog, setIsDialog] = useState(false);
  // local state for editing
  const [post, setPost] = useState(props);
  useEffect(() => {
    setPost(props);
  }, [props]);

  //get user name by userId and add it to state
  useEffect(() => {
    const getUserName = async (userId: number) => {
      const res = await api.get(`users/${userId}`);
      dispatch(
        editPost({
          ...post,
          userName: res.data.name,
        })
      );
    };
    if (!props.userName) getUserName(userId);
  }, [userId]);

  //get comments by post id
  useEffect(() => {
    const getComments = async (id: number) => {
      const res = await api.get(`posts/${id}/comments`);
      setComments(res.data);
    };
    if (showComments) getComments(id);
  }, [userId, showComments]);

  // render posts
  const commentsElems = comments.map((comment: IComment) => (
    <Comment {...comment} key={comment.id} />
  ));

  // buttons' handlers
  const onCommentBtn = () => {
    setShowComments(!showComments);
  };

  const onFavBtn = () => {
    dispatch(editPost({ ...post, favorite: !props.favorite }));
  };

  const onEditBtn = () => {
    setIsEditable(!isEditable);
  };

  const onSaveBtn = () => {
    dispatch(
      editPost({
        ...post,
      })
    );
    setIsEditable(false);
  };

  const onCancelBtn = () => {
    setPost(props);
    setIsEditable(false);
  };

  const onDeleteBtn = () => {
    dispatch(deletePost(id));
  };

  const closeConfirmModal = () => {
    setIsDialog(false);
  };
  const postClasses = cn({
    'post relative bg-gray-700 bg-opacity-20 p-4 rounded-md h-full flex flex-col justify-between':
      true,
    'md:col-span-2': showComments,
  });
  return (
    <li className={postClasses}>
      <article className="content flex flex-col justify-between h-full">
        <section className="mr-5">
          <textarea
            contentEditable={isEditable}
            className="w-full h-18 resize-none bg-transparent font-bold text-xl"
            value={post.title}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setPost({ ...post, title: e.target.value });
            }}
          />
          <input
            disabled={!isEditable}
            className="w-full bg-transparent text-teal-400 text-sm"
            value={post.userName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPost({ ...post, userName: e.target.value });
            }}
          />
          <textarea
            disabled={!isEditable}
            className=" w-full h-24 resize-none my-2 bg-transparent  text-gray-200 text-sm"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setPost({ ...post, body: e.target.value });
            }}
            value={post.body}
          />
        </section>

        {/* buttons for edit mode */}
        {isEditable && (
          <div className="absolute left-2 bottom-4 flex">
            <IconBtn type="check" handler={onSaveBtn} />
            <IconBtn type="cancel" handler={onCancelBtn} />
          </div>
        )}

        {/* post buttons */}
        <div className="controls flex justify-end mx-2 my-1">
          <IconBtn type="edit" isActive={isEditable} handler={onEditBtn} />
          <IconBtn type="favorite" isActive={favorite} handler={onFavBtn} />
          <IconBtn type="delete" handler={() => setIsDialog(true)} />
          <IconBtn type="comments" isActive={showComments} handler={onCommentBtn} />
        </div>
      </article>
      <section className="comments text-xs">
        {comments && showComments && (
          <>
            <h3 className="text-base"> Comments:</h3>
            <ul>{commentsElems}</ul>
          </>
        )}
      </section>
      <input
        type="checkbox"
        className="absolute top-2 right-2 bg-transparent border-gray-100 accent-teal-500 w-4 h-4"
      ></input>
      {isDialog && (
        <ConfirmDialog
          close={closeConfirmModal}
          confirm={onDeleteBtn}
          text={`Delete post ${post.title} by ${post.userName}?`}
        />
      )}
    </li>
  );
};
