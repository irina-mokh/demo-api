import { useEffect, useState } from 'react';
import { IComment, IPost, IUser } from '../utils/types';
import { api } from '../utils/axios';
import { IconBtn } from './IconBtn';
import cn from 'classnames';

export const Post = ({ title, body, userId, id, favorite }: IPost) => {
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
    getComments(id);
  }, [userId]);

  const commentsElems = comments.map(({ name, email, body }: IComment) => (
    <li className="comment bg-gray-700 bg-opacity-20 p-2 rounded-md my-1">
      <p className="py-1">{name}</p>
      <p>{email}</p>
      <p>{body}</p>
    </li>
  ));
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const postClasses = cn({
    'relative bg-gray-700 bg-opacity-20 p-4 rounded-md h-full flex flex-col justify-between': true,
    'md:col-span-2': showComments,
  });
  return (
    <li className={postClasses}>
      <article className="content ">
        <section className="mr-5">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-teal-400 text-sm">{user?.name}</p>
          <p className="text-gray-200 text-sm">{body}</p>
        </section>

        <div className="controls flex justify-end mx-2 my-1">
          <IconBtn type="edit" />
          <IconBtn type="favorite" isActive={favorite} />
          <IconBtn type="delete" />
          <IconBtn type="comments" isActive={showComments} handler={toggleComments} />
        </div>
      </article>
      <section className="text-xs">
        {comments && showComments && (
          <>
            <h3 className="text-sm"> Commnets:</h3>
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
