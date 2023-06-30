import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { Page } from './Page';
import { useEffect, useState } from 'react';
import { getAlbums } from '../store/albums/actions';
import { selectAlbums } from '../store/albums/selectors';
import { selectUsers } from '../store/users/selectors';
import { Album } from '../components/Album';
import { Pagination } from '../components/Pagination';
import { deleteAlbum, editAlbum } from '../store/albums/reducer';
import { TitleSearch } from '../components/Filters/TitleSearch';
import { UserFilter } from '../components/Filters/UserFilter';
import { FavoriteFilter } from '../components/Filters/FavoriteFilter';
import { PerPageSelect } from '../components/Filters/PerPageSelect';
import { Sort } from '../components/Filters/Sort';
import { Filters } from '../components/Filters';
import { MultipleSelectionBar } from '../components/MultipleSelectionBar';
import { useItemsPerPage } from '../utils/hooks';
import { IItem } from '../utils/types';
import { updateDisplayItems } from '../utils/helpers';

export const AlbumsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, sort, perPage, filter } = useSelector(selectAlbums);
  const { data: users } = useSelector(selectUsers);

  const display = updateDisplayItems({ data, sort, ...filter, page: 'albums' });

  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Array<number>>([]);
  const clearSelected = () => setSelected([]);

  useEffect(() => {
    if (!data.length) dispatch(getAlbums(users));
  }, [users]);

  // display items depending on page settings
  const itemsPerPage: Array<IItem> = useItemsPerPage(display, perPage, page);

  const items = itemsPerPage.map((item) => {
    const handleSelectItem = (checked: boolean) => {
      if (checked) {
        setSelected([...selected, item.id]);
      } else {
        setSelected(selected.filter((n) => n !== item.id));
      }
    };
    return <Album key={item.id} id={item.id} handleSelect={handleSelectItem} />;
  });
  const itemHandlers = {
    delete: deleteAlbum,
    edit: editAlbum,
  };

  return (
    <Page title="Photos">
      <Filters>
        <TitleSearch />
        <UserFilter />
        <Sort />
        <FavoriteFilter />
        <PerPageSelect />
      </Filters>
      {/* ALBUMS */}
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">{items}</ul>
      <Pagination currentP={page} perPage={perPage} length={display.length} setPage={setPage} />

      <MultipleSelectionBar
        isActive={selected.length > 0}
        hasDel
        hasFav
        handlers={itemHandlers}
        selectedItems={selected}
        clearSelected={clearSelected}
      />
    </Page>
  );
};
