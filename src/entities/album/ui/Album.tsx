import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { selectAlbums } from 'entities/album/model/selectors';
import { AppDispatch } from 'app/store';
import { deleteAlbum, editAlbum } from 'entities/album/model/reducer';

import { IconBtn } from 'shared/ui/IconBtn';
import { ConfirmDialog } from 'shared/ui/ConfirmDialog';
import { EditBtns } from 'features/editBtns';
import { CheckboxForMultiple } from 'shared/ui/CheckboxForMultiple';
import { IAlbum } from 'shared/utils/types';

type AlbumProps = {
  id: number,
  handleSelect: (v: boolean) => void,
  checked: boolean,
};
export const Album = ({ id, handleSelect, checked }: AlbumProps) => {
  const { data } = useSelector(selectAlbums);
  const album = data.filter((p: IAlbum) => p.id === id)[0];
  const { favorite } = album;
  const dispatch: AppDispatch = useDispatch();

  const [isEditable, setIsEditable] = useState(false);

  const [isDialog, setIsDialog] = useState(false);
  // local state for editing
  const [albumEdit, setAlbumEdit] = useState(album);
  useEffect(() => {
    setAlbumEdit(album);
  }, [album]);

  // buttons' handlers
  const onFavBtn = () => {
    dispatch(editAlbum({ ...album, favorite: !album.favorite }));
  };

  const onDeleteBtn = () => {
    dispatch(deleteAlbum(id));
  };

  const closeConfirmModal = () => {
    setIsDialog(false);
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    prop: string
  ) => {
    setAlbumEdit({ ...albumEdit, [prop]: e.target.value });
  };

  const inputCl = cn({
    'bg-transparent w-full border-2 p-1 rounded-md': true,
    'border-transparent': !isEditable,
    'border-gray-400': isEditable,
  });

  return (
    <li className="album relative flex flex-col justify-between bg-slate-700 pl-4 pr-7 pt-4 pb-0 rounded-md mx-1">
      <textarea
        disabled={!isEditable}
        className={inputCl + ' h-24 resize-none font-bold text-xl'}
        value={albumEdit.title}
        onChange={(e) => handleTextChange(e, 'title')}
      />
      <input
        disabled={!isEditable}
        className={inputCl + ' text-teal-400 text-sm mt-2'}
        value={albumEdit.userName}
        onChange={(e) => handleTextChange(e, 'userName')}
      />

      <Link to={`${id}`} className="mt-2 text-sm text-right hover:underline">
        Photos {'>'}
      </Link>

      {/* album buttons */}
      <div className="controls flex justify-end mx-2 my-1">
        <EditBtns
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          handler={editAlbum}
          current={albumEdit}
          setCurrent={setAlbumEdit}
          initial={album}
        />
        <IconBtn type="favorite" isActive={favorite} handler={onFavBtn} />
        <IconBtn type="delete" handler={() => setIsDialog(true)} />
      </div>
      <CheckboxForMultiple handleSelect={handleSelect} isChecked={checked} />
      {isDialog && (
        <ConfirmDialog
          close={closeConfirmModal}
          confirm={onDeleteBtn}
          text={`Delete album ${album.title} by ${album.userName}?`}
        />
      )}
    </li>
  );
};
