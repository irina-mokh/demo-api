import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Btn } from 'shared/ui/Btn';
import { ConfirmDialog } from 'shared/ui/ConfirmDialog';
import { IItem } from 'shared/utils/types';
import { AnyAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'app/store';

type MultipleSelectionBarProps = {
  isActive: boolean,
  hasFav?: boolean,
  hasDel?: boolean,
  handlers: {
    delete: (id: number) => AnyAction,
    edit: (v: Partial<IItem>) => AnyAction,
  },
  clearSelected: () => void,
  selectedItems: Array<number>,
};

export const MultipleSelectionBar = ({
  hasFav,
  hasDel,
  isActive,
  handlers,
  clearSelected,
  selectedItems,
}: MultipleSelectionBarProps) => {
  const dispatch: AppDispatch = useDispatch();

  const [confirmDialogDel, setConfirmDialogDel] = useState(false);
  const [confirmDialogFav, setConfirmDialogFav] = useState(false);

  const multipleDeleting = () => {
    selectedItems.forEach((id) => {
      dispatch(handlers.delete(id));
    });
    setConfirmDialogDel(false);
    clearSelected();
  };

  const multipleAddingToFav = () => {
    selectedItems.forEach((id) => {
      dispatch(handlers.edit({ id: id, favorite: true }));
    });
    setConfirmDialogFav(false);
    clearSelected();
  };

  return (
    <>
      {isActive && (
        <div className="bar fixed bottom-2 right-2 rounded-md min-w-[40%] flex justify-between items-center bg-gray-700 border-2 border-teal-400 shadow-2xl p-3 m-auto child:mx-2">
          <p>For all checked items:</p>
          {hasDel && <Btn text="Delete" handler={() => setConfirmDialogDel(true)} />}
          {hasFav && <Btn text="Add to favorite" handler={() => setConfirmDialogFav(true)} />}
        </div>
      )}
      {confirmDialogDel && (
        <ConfirmDialog
          text="Delete items?"
          close={() => setConfirmDialogDel(false)}
          confirm={multipleDeleting}
        />
      )}
      {confirmDialogFav && (
        <ConfirmDialog
          text="Add items to favorite?"
          close={() => setConfirmDialogFav(false)}
          confirm={multipleAddingToFav}
        />
      )}
    </>
  );
};
