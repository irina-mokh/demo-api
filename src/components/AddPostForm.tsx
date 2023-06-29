import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

import { AppDispatch } from '../store';
import { selectPosts } from '../store/posts/selectors';
import { selectUsers } from '../store/users/selectors';
import { addPost } from '../store/posts/actions';

import { Modal } from './Modal';
import { Btn } from './Btn';

import { AddPostInputs, IPost } from '../utils/types';

type AddPostFormProps = {
  close: () => void,
};

export const AddPostForm = ({ close }: AddPostFormProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { data } = useSelector(selectPosts);
  const { data: users } = useSelector(selectUsers);
  const names = users.map((user) => user.name);
  const methods = useForm<IPost>({});
  const { register, handleSubmit } = methods;

  const onSubmit: SubmitHandler<AddPostInputs> = (post) => {
    dispatch(
      addPost({
        userId: users.filter((user) => user.name == post.userName)[0].id,
        id: data.length + 1,
        ...post,
        favorite: false,
      })
    );
    close();
  };

  const options = names.map((n) => (
    <option key={n} value={n} className="bg-gray-800">
      {n}
    </option>
  ));
  return (
    <Modal title="Create post" close={close}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" min-w-[400px] flex flex-col [&>label]:text-teal-500 [&>label]:mt-3"
      >
        <label htmlFor="userName">User name:</label>

        <select
          id="userName"
          {...register('userName', { required: true })}
          className="w-full bg-transparent  border-2 rounded-md p-1"
        >
          {options}
        </select>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          {...register('title', { required: true })}
          id="title"
          placeholder="New awesome post"
          className="w-full bg-transparent border-2 rounded-md p-1"
        />
        <label htmlFor="body">Text:</label>
        <textarea
          id="body"
          placeholder="My story ..."
          className="w-full bg-transparent resize-none  border-2 rounded-md p-1"
          {...register('body', { required: true })}
        />
        <div className="flex justify-around py-3">
          <Btn text="Cancel" handler={close} />
          <Btn text="Send" type="submit" />
        </div>
      </form>
    </Modal>
  );
};
