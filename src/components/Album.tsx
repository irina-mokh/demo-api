import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectAlbums } from '../store/albums/selectors';
import { IconBtn } from './IconBtn';
import { ConfirmDialog } from './ConfirmDialog';
import { AppDispatch } from '../store';
import { deleteAlbum, editAlbum } from '../store/albums/reducer';
import { Link } from 'react-router-dom';

type AlbumProps = {
  id: number,
  handleSelect: (v: boolean) => void,
};
export const Album = ({ id, handleSelect }: AlbumProps) => {
  const { data } = useSelector(selectAlbums);
  const album = data.filter((p) => p.id === id)[0];
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

  const onEditBtn = () => {
    setIsEditable(!isEditable);
  };

  const onSaveBtn = () => {
    dispatch(
      editAlbum({
        ...albumEdit,
      })
    );
    setIsEditable(false);
  };

  const onCancelBtn = () => {
    setAlbumEdit(album);
    setIsEditable(false);
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

  return (
    <li className="album relative flex flex-col justify-between bg-slate-700 pl-4 pr-5 pt-4 pb-0 rounded-md mx-1">
      <textarea
        disabled={!isEditable}
        className="w-full h-24 resize-none bg-transparent font-bold text-xl"
        value={albumEdit.title}
        onChange={(e) => handleTextChange(e, 'title')}
      />
      <input
        disabled={!isEditable}
        className="w-full bg-transparent text-teal-400 text-sm"
        value={albumEdit.userName}
        onChange={(e) => handleTextChange(e, 'userName')}
      />

      <Link to={`${id}`} className="mt-2 text-sm text-right hover:underline">
        Photos {'>'}
      </Link>

      {/* buttons for edit mode */}
      {isEditable && (
        <div className="absolute left-2 bottom-4 flex">
          <IconBtn type="check" handler={onSaveBtn} />
          <IconBtn type="cancel" handler={onCancelBtn} />
        </div>
      )}

      {/* album buttons */}
      <div className="controls flex justify-end mx-2 my-1">
        <IconBtn type="edit" isActive={isEditable} handler={onEditBtn} />
        <IconBtn type="favorite" isActive={favorite} handler={onFavBtn} />
        <IconBtn type="delete" handler={() => setIsDialog(true)} />
      </div>
      {/* selection checkbox */}
      <input
        type="checkbox"
        defaultChecked={false}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleSelect(e.target.checked);
        }}
        className="absolute top-2 right-2 bg-transparent border-gray-100 accent-teal-500 w-4 h-4"
      ></input>
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
