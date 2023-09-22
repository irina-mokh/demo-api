import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

import { AppDispatch } from 'app/store';
import { selectTasks } from 'entities/task/model/selectors';
import { addTask } from 'entities/task/model/actions';

import { Modal } from 'shared/ui/Modal';
import { Btn } from 'shared/ui/Btn';

import { AddTaskInputs, ITask } from 'utils/types';

type AddTaskFormProps = {
  close: () => void,
};

export const AddTaskForm = ({ close }: AddTaskFormProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { data } = useSelector(selectTasks);
  const methods = useForm<ITask>({});
  const { register, handleSubmit } = methods;

  const onSubmit: SubmitHandler<AddTaskInputs> = (task) => {
    dispatch(
      addTask({
        userId: 0,
        id: data.length + 1,
        ...task,
        completed: false,
        userName: '',
        favorite: false,
        body: '',
      })
    );
    close();
  };

  return (
    <Modal title="Create task" close={close}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" min-w-[400px] flex flex-col [&>label]:text-teal-500 [&>label]:mt-3"
      >
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          {...register('title', { required: true })}
          id="title"
          placeholder="New awesome task"
          className="w-full bg-transparent border-2 rounded-md p-1"
        />

        <div className="flex justify-around py-3">
          <Btn text="Cancel" handler={close} />
          <Btn text="Send" type="submit" />
        </div>
      </form>
    </Modal>
  );
};
