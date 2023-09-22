import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'app/store';
import Page from './Page';
import { useEffect, useState } from 'react';

import { getAlbums } from 'entities/album/model/actions';
import { selectAlbums } from 'entities/album/model/selectors';
import { selectUsers } from 'entities/user/model/selectors';
import { deleteAlbum, editAlbum } from 'entities/album/model/reducer';

import { Album } from 'entities/album/ui/Album';
import { Pagination } from 'widgets/pagination/Pagination';
import { TitleSearch } from 'widgets/filters/TitleSearch';
import { UserFilter } from 'widgets/filters/UserFilter';
import { FavoriteFilter } from 'widgets/filters/FavoriteFilter';
import { PerPageSelect } from 'widgets/filters/PerPageSelect';
import { Sort } from 'widgets/filters/Sort';
import { Filters } from 'widgets/filters';
import { MultipleSelectionBar } from '../features/multipleSelectionBar';

import { useItemsPerPage } from '../utils/hooks';
import { IItem } from '../utils/types';
import { updateDisplayItems } from '../utils/helpers';

const AlbumsPage = () => {
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
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">{items}</ul>
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

export default AlbumsPage;
