import { AppDispatch } from 'app/store';
import { deletePost } from 'entities/post/model/reducer';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ConfirmDialog } from 'shared/ui/ConfirmDialog';
import { IconBtn } from 'shared/ui/IconBtn';
import { IPost } from 'shared/utils/types';

export const DeletePost = ({ id, title, userName }: IPost) => {
  const dispatch: AppDispatch = useDispatch();

  const [isDialog, setIsDialog] = useState(false);

  const onDeleteBtn = () => {
    dispatch(deletePost(id));
  };

  const closeConfirmModal = () => {
    setIsDialog(false);
  };
  return (
    <>
      <IconBtn type="delete" handler={() => setIsDialog(true)} />
      {isDialog && (
        <ConfirmDialog
          close={closeConfirmModal}
          confirm={onDeleteBtn}
          text={`Delete post ${title} by ${userName}?`}
        />
      )}
    </>
  );
};
