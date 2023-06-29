import { useDispatch, useSelector } from 'react-redux';
import { Modal } from './Modal';
import { selectPosts } from '../store/posts/selectors';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AddPostInputs, IPost } from '../utils/types';
import { Btn } from './Btn';
import { selectUsers } from '../store/users/selectors';
import { AppDispatch } from '../store';
import { addPost } from '../store/posts/actions';

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
    <option key={n} value={n}>
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
