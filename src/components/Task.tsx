import cn from 'classnames';
import { selectTasks } from '../store/tasks/selectors';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { deleteTask, editTask } from '../store/tasks/reducer';
import { AppDispatch } from '../store';
import { IconBtn } from './IconBtn';
import { ConfirmDialog } from './ConfirmDialog';
import { EditBtns } from './EditBtns';
import { CheckboxForMultiple } from './CheckboxForMultiple';

type ITaskProps = {
  id: number,
  handleSelect: (v: boolean) => void,
};

export const Task = ({ id, handleSelect }: ITaskProps) => {
  const { data } = useSelector(selectTasks);
  const dispatch: AppDispatch = useDispatch();

  const task = data.filter((p) => p.id === id)[0];
  const { completed } = task;

  const [isDialog, setIsDialog] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  // local state for editing
  const [taskEdit, setTaskEdit] = useState(task);
  useEffect(() => {
    setTaskEdit(task);
  }, [task]);

  // buttons' handlers
  const onDeleteBtn = () => {
    dispatch(deleteTask(id));
  };

  const closeConfirmModal = () => {
    setIsDialog(false);
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    prop: string
  ) => {
    setTaskEdit({ ...taskEdit, [prop]: e.target.value });
  };

  const toggleTaskStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      editTask({
        id: id,
        completed: e.target.checked,
      })
    );
  };
  const taskClasses = cn({
    'task relative flex justify-between items-center p-3 bg-gray-700 rounded-md bg-opacity-50 mb-2':
      true,
    'line-through text-gray-400': completed,
  });
  return (
    <li className={taskClasses}>
      <input
        type="checkbox"
        checked={completed}
        onChange={toggleTaskStatus}
        className="w-8 h-8 bg-transparent mr-3 accent-teal-500"
      />
      <input
        disabled={!isEditable}
        className="w-full bg-transparent text-lg"
        value={taskEdit.title}
        onChange={(e) => handleTextChange(e, 'title')}
      />
      {/* task buttons */}
      <div className="controls flex justify-end mx-2 my-1">
        <EditBtns
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          handler={editTask}
          current={taskEdit}
          setCurrent={setTaskEdit}
          initial={task}
        />
        <IconBtn type="delete" handler={() => setIsDialog(true)} />
      </div>
      <CheckboxForMultiple handleSelect={handleSelect} />
      {isDialog && (
        <ConfirmDialog
          close={closeConfirmModal}
          confirm={onDeleteBtn}
          text={`Delete task ${task.title}?`}
        />
      )}
    </li>
  );
};
