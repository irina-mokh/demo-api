import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { api } from '../utils/axios';

import { AppDispatch } from '../store';
import { deletePost, editPost } from '../store/posts/reducer';
import { selectPosts } from '../store/posts/selectors';

import { IconBtn } from './IconBtn';
import { Comment } from './Comment';
import { ConfirmDialog } from './ConfirmDialog';
import { EditBtns } from './EditBtns';
import { CheckboxForMultiple } from './CheckboxForMultiple';

import { IComment } from '../utils/types';

type PostProps = {
  id: number,
  handleSelect: (v: boolean) => void,
};

export const Post = ({ id, handleSelect }: PostProps) => {
  const { data } = useSelector(selectPosts);
  const post = data.filter((p) => p.id === id)[0];
  const { userId, favorite } = post;
  const dispatch: AppDispatch = useDispatch();

  const [isEditable, setIsEditable] = useState(false);

  const [isDialog, setIsDialog] = useState(false);
  // local state for editing
  const [postEdit, setPostEdit] = useState(post);
  useEffect(() => {
    setPostEdit(post);
  }, [post]);

  // RENDER COMMENTS
  const [comments, setComments] = useState<Array<IComment>>([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const getComments = async (id: number) => {
      const res = await api.get(`posts/${id}/comments`);
      setComments(res.data);
    };
    if (showComments) getComments(id);
  }, [userId, showComments]);

  const commentsElems = comments.map((comment: IComment) => (
    <Comment {...comment} key={comment.id} />
  ));

  const onCommentBtn = () => {
    setShowComments(!showComments);
  };

  // buttons' handlers

  const onFavBtn = () => {
    dispatch(editPost({ ...post, favorite: !post.favorite }));
  };

  const onDeleteBtn = () => {
    dispatch(deletePost(id));
  };

  const closeConfirmModal = () => {
    setIsDialog(false);
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    prop: string
  ) => {
    setPostEdit({ ...postEdit, [prop]: e.target.value });
  };
  const postClasses = cn({
    'post relative bg-gray-700 bg-opacity-20 p-4 rounded-md h-full flex flex-col justify-between':
      true,
    'md:col-span-2': showComments,
  });

  const inputCl = cn({
    'bg-transparent w-full border-2 p-1 rounded-md': true,
    'border-transparent': !isEditable,
    'border-gray-400': isEditable,
  });

  return (
    <li className={postClasses}>
      <article className="content flex flex-col justify-between h-full">
        <section className="mr-5">
          <textarea
            disabled={!isEditable}
            className={inputCl + ' h-18 resize-none font-bold text-xl'}
            value={postEdit.title}
            onChange={(e) => handleTextChange(e, 'title')}
          />
          <input
            disabled={!isEditable}
            className={inputCl + ' text-teal-400 text-sm'}
            value={postEdit.userName}
            onChange={(e) => handleTextChange(e, 'userName')}
          />
          <textarea
            disabled={!isEditable}
            className={inputCl + ' h-24 resize-none my-2 text-gray-200 text-sm'}
            onChange={(e) => handleTextChange(e, 'body')}
            value={postEdit.body}
          />
        </section>

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
          <IconBtn type="favorite" isActive={favorite} handler={onFavBtn} />
          <IconBtn type="delete" handler={() => setIsDialog(true)} />
          <IconBtn type="comments" isActive={showComments} handler={onCommentBtn} />
        </div>
      </article>
      {/* COMMENTS */}
      <section className="comments text-xs">
        {comments && showComments && (
          <>
            <h3 className="text-base"> Comments:</h3>
            <ul>{commentsElems}</ul>
          </>
        )}
      </section>
      <CheckboxForMultiple handleSelect={handleSelect} />
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
