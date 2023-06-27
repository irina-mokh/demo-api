import { useEffect, useState } from 'react';
import { IComment, IPost, IUser } from '../utils/types';
import { api } from '../utils/axios';
import { IconBtn } from './IconBtn';
import cn from 'classnames';
import { Comment } from './Comment';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/posts/reducer';

export const Post = ({ title, body, userId, id, favorite }: IPost) => {
  const dispatch: AppDispatch = useDispatch();
  const [user, setUser] = useState<Partial<IUser>>({});

  const [comments, setComments] = useState<Array<IComment>>([]);
  const [showComments, setShowComments] = useState(false);

  //get user name by userId
  useEffect(() => {
    const getUserName = async (userId: number) => {
      const res = await api.get(`users/${userId}`);
      setUser(res.data);
    };
    getUserName(userId);
  }, [userId]);

  //get comments by post id
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

  // buttons' handlers
  const onCommentBtn = () => {
    setShowComments(!showComments);
  };

  const onFavBtn = () => {
    dispatch(toggleFavorite(id));
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
          <h3 className="font-bold text-xl">{title}</h3>
          <p className="text-teal-400 text-sm">{user?.name}</p>
          <p className=" my-2 text-gray-200 text-sm">{body}</p>
        </section>

        <div className="controls flex justify-end mx-2 my-1">
          <IconBtn type="edit" />
          <IconBtn type="favorite" isActive={favorite} handler={onFavBtn} />
          <IconBtn type="delete" />
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
    </li>
  );
};
