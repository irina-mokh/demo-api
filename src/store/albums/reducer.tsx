import { createSlice } from '@reduxjs/toolkit';
import { getAlbums, getPhotos } from './actions';
import { IAlbumsState } from '../../utils/types';
import {
  changeSingleFilter,
  changeSort,
  changeUserFilter,
  deleteItem,
  editItem,
  filter,
  setPerPage,
  sort,
} from '../../utils/helpers';

const initialState: IAlbumsState = {
  data: [],
  photos: [],
  display: [],
  perPage: '10',
  filter: {
    userNames: ['all'],
    title: '',
    favorite: false,
  },
  sort: 'ID',
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    editAlbum: editItem,
    deleteAlbum: deleteItem,
    setAlbumsPerPage: setPerPage,
    changeAlbumsUserNamesFilter: changeUserFilter,
    changeAlbumsFilter: changeSingleFilter,
    filterAlbums: filter,
    changeAlbumsSortType: changeSort,
    sortAlbums: sort,
  },
  extraReducers: (builder) => {
    builder
      // getPosts
      .addCase(getAlbums.pending, () => {
        // state.error = null;
      })
      .addCase(getAlbums.fulfilled, (state, { payload }) => {
        // state.error = null;
        state.data = [...payload];
        state.display = [...payload];
      })
      .addCase(getAlbums.rejected, () => {
        // state.error = String(payload);
      })
      // getPhotos
      .addCase(getPhotos.pending, () => {
        // state.error = null;
      })
      .addCase(getPhotos.fulfilled, (state, { payload }) => {
        // state.error = null;
        state.photos = [...payload];
      })
      .addCase(getPhotos.rejected, () => {
        // state.error = String(payload);
      });
  },
});

export const {
  deleteAlbum,
  editAlbum,
  filterAlbums,
  sortAlbums,
  setAlbumsPerPage,
  changeAlbumsSortType,
  changeAlbumsFilter,
  changeAlbumsUserNamesFilter,
} = albumsSlice.actions;

export default albumsSlice.reducer;
