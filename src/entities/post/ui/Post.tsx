import cn from 'classnames';

import { IPost } from 'shared/utils/types';

type PostProps = {
  postEdit: IPost,
  // handleSelect: (v: boolean) => void,
  isEditable: boolean,
  handlePostChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    prop: string
  ) => void,
};

export const Post = ({ postEdit, isEditable, handlePostChange }: PostProps) => {
  const inputCl = cn({
    'bg-transparent w-full border-2 p-1 rounded-md ': true,
    'border-transparent': !isEditable,
    'border-gray-400': isEditable,
  });

  return (
    <section className="mr-5">
      {/* TITLE */}
      {isEditable ? (
        <textarea
          disabled={!isEditable}
          className={inputCl + ' h-10 resize-none font-bold text-xl'}
          value={postEdit.title}
          onChange={(e) => handlePostChange(e, 'title')}
        />
      ) : (
        <p className={inputCl + ' h-10 resize-none font-bold text-xl truncate'}>{postEdit.title}</p>
      )}
      {/* USERNAME */}
      <input
        disabled={!isEditable}
        className={inputCl + ' text-teal-400 text-sm'}
        value={postEdit.userName}
        onChange={(e) => handlePostChange(e, 'userName')}
      />
      {/* BODY */}
      {isEditable ? (
        <textarea
          disabled={!isEditable}
          className={inputCl + ' h-18 resize-none my-2 text-gray-200 text-sm'}
          onChange={(e) => handlePostChange(e, 'body')}
          value={postEdit.body}
        />
      ) : (
        <p className={inputCl + ' h-18 resize-none my-2 text-gray-200 text-sm truncate'}>
          {postEdit.body}
        </p>
      )}
    </section>
  );
};
