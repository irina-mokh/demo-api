import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { Page } from './Page';
import { useEffect, useState } from 'react';
import { getAlbums } from '../store/albums/actions';
import { selectAlbums } from '../store/albums/selectors';
import { selectUsers } from '../store/users/selectors';
import { Album } from '../components/Album';
import { Pagination } from '../components/Pagination';
import { ConfirmDialog } from '../components/ConfirmDialog';
import {
  changeAlbumsSortType,
  deleteAlbum,
  editAlbum,
  filterAlbums,
  sortAlbums,
} from '../store/albums/reducer';
import { Btn } from '../components/Btn';
import { TitleSearch } from '../components/Filters/TitleSearch';
import { UserFilter } from '../components/Filters/UserFilter';
import { Select } from '../components/Select';
import { FavoriteFilter } from '../components/Filters/FavoriteFilter';
import { PerPageSelect } from '../components/PerPageSelect';
import { SORT_OPTIONS } from '../utils';

export const AlbumsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, perPage, display, filter, sort } = useSelector(selectAlbums);
  const { data: users } = useSelector(selectUsers);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Array<number>>([]);
  const [confirmDialogDel, setConfirmDialogDel] = useState(false);
  const [confirmDialogFav, setConfirmDialogFav] = useState(false);

  useEffect(() => {
    if (!data.length) dispatch(getAlbums(users));
  }, [users]);

  // filter posts
  useEffect(() => {
    dispatch(filterAlbums());
  }, [filter, data]);

  // sort posts
  useEffect(() => {
    dispatch(sortAlbums());
  }, [sort, filter, data]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeAlbumsSortType(e.target.value));
  };

  const sortOptions = SORT_OPTIONS.map((opt) => (
    <option key={opt.name} value={String(opt.name)}>
      {opt.name}
    </option>
  ));

  // display posts depending on page settings
  let itemsPerPage = display;
  if (perPage !== 'all') {
    itemsPerPage = display.slice(page * +perPage, +perPage * (page + 1));
  }
  const items = itemsPerPage.map((post) => {
    const handleSelectItem = (checked: boolean) => {
      if (checked) {
        setSelected([...selected, post.id]);
      } else {
        setSelected(selected.filter((n) => n !== post.id));
      }
    };
    return <Album key={post.id} id={post.id} handleSelect={handleSelectItem} />;
  });

  // multiple actions
  const multipleDeleting = () => {
    selected.forEach((id) => {
      dispatch(deleteAlbum(id));
    });
    setConfirmDialogDel(false);
    setSelected([]);
  };

  const multipleAddingToFav = () => {
    selected.forEach((id) => {
      const newItem = data.filter((post) => post.id === id)[0];
      dispatch(editAlbum({ ...newItem, favorite: true }));
    });
    setConfirmDialogFav(false);
    setSelected([]);
  };

  return (
    <Page title="Photos">
      {/* FILTERS */}
      <form className="flex rounded-md bg-gray-900 bg-opacity-40 text-gray-400 px-4 py-2">
        <legend className="visually-hidden text-lg">Filters:</legend>
        <fieldset className="flex flex-wrap py-1 w-full justify-between child:m-2">
          <TitleSearch />
          <UserFilter />
          <Select handler={handleSortChange} value={sort} label="Sort by:" options={sortOptions} />
          <FavoriteFilter />
          <PerPageSelect />
        </fieldset>
      </form>
      {/* ALBUMS */}
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">{items}</ul>
      <Pagination currentP={page} perPage={+perPage} length={display.length} setPage={setPage} />

      {/* MODALS */}
      {selected.length > 0 && (
        <div className="bar fixed bottom-2 right-2 rounded-md min-w-[40%] flex justify-between items-center bg-gray-700 border-2 border-teal-400 shadow-2xl p-3 m-auto child:mx-2">
          <p>For all checked items:</p>
          <Btn text="Add to favorite" handler={() => setConfirmDialogFav(true)} />
          <Btn text="Delete" handler={() => setConfirmDialogDel(true)} />
        </div>
      )}
      {confirmDialogDel && (
        <ConfirmDialog
          text="Delete posts?"
          close={() => setConfirmDialogDel(false)}
          confirm={multipleDeleting}
        />
      )}
      {confirmDialogFav && (
        <ConfirmDialog
          text="Add posts to favorite?"
          close={() => setConfirmDialogFav(false)}
          confirm={multipleAddingToFav}
        />
      )}
    </Page>
  );
};
