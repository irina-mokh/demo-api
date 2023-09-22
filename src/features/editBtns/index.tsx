import { AnyAction } from '@reduxjs/toolkit';
import { IItem } from 'utils/types';
import { IconBtn } from 'shared/ui/IconBtn';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/store';

type EditBtnsProps = {
  isEditable: boolean,
  setIsEditable: (v: boolean) => void,
  current: IItem,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCurrent: (item: any) => void,
  handler: (item: IItem) => AnyAction,
  initial: IItem,
};
export const EditBtns = ({
  isEditable,
  setIsEditable,
  current,
  setCurrent,
  handler,
  initial,
}: EditBtnsProps) => {
  const dispatch: AppDispatch = useDispatch();

  const onSaveBtn = () => {
    dispatch(handler({ ...current }));
    setIsEditable(false);
  };

  const onCancelBtn = () => {
    setCurrent(initial);
    setIsEditable(false);
  };

  const onEditBtn = () => {
    setIsEditable(!isEditable);
  };

  return (
    <>
      {isEditable && (
        <div className="flex">
          <IconBtn type="check" handler={onSaveBtn} />
          <IconBtn type="cancel" handler={onCancelBtn} />
        </div>
      )}
      <IconBtn type="edit" disabled={isEditable} handler={onEditBtn} />
    </>
  );
};
