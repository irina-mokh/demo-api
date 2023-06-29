import {
  changeAlbumsFilter,
  changeAlbumsSortType,
  changeAlbumsUserNamesFilter,
  setAlbumsPerPage,
} from '../store/albums/reducer';
import {
  changePostsFilter,
  changePostsSortType,
  changePostsUserNamesFilter,
  setPostsPerPage,
} from '../store/posts/reducer';
import { IFilterHANDLERS, IItem } from './types';

export const SORT_OPTIONS = [
  { name: 'ID', cb: (a: IItem, b: IItem) => a.id - b.id },
  { name: 'ID descending', cb: (a: IItem, b: IItem) => b.id - a.id },
  { name: 'title a-z', cb: (a: IItem, b: IItem) => (a.title > b.title ? 1 : -1) },
  { name: 'title z-a', cb: (a: IItem, b: IItem) => (b.title > a.title ? 1 : -1) },
  { name: 'userName a-z', cb: (a: IItem, b: IItem) => (a.userName > b.userName ? 1 : -1) },
  { name: 'userName z-a', cb: (a: IItem, b: IItem) => (b.userName > a.userName ? 1 : -1) },
];
