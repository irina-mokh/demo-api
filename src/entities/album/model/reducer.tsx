import { createSlice } from '@reduxjs/toolkit';
import { getAlbums, getPhotos } from './actions';
import { IAlbumsState } from 'shared/utils/types';
import {
  changeSingleFilter,
  changeSort,
  changeUserFilter,
  deleteItem,
  editItem,
  setPerPage,
} from 'shared/utils/helpers';

const initialState: IAlbumsState = {
  data: [],
  photos: [],
  perPage: '10',
  sort: 'ID',
  filter: {
    userNames: ['all'],
    title: '',
    favorite: false,
  },
  error: null,
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
    changeAlbumsSortType: changeSort,
  },
  extraReducers: (builder) => {
    builder
      // getPosts
      .addCase(getAlbums.pending, (state) => {
        state.error = null;
      })
      .addCase(getAlbums.fulfilled, (state, { payload }) => {
        state.error = null;
        state.data = [...payload];
      })
      .addCase(getAlbums.rejected, (state, { payload }) => {
        state.error = String(payload);
      })
      // getPhotos
      .addCase(getPhotos.pending, (state) => {
        state.error = null;
      })
      .addCase(getPhotos.fulfilled, (state, { payload }) => {
        state.error = null;
        state.photos = [...payload];
      })
      .addCase(getPhotos.rejected, (state, { payload }) => {
        state.error = String(payload);
      });
  },
});

export const {
  deleteAlbum,
  editAlbum,
  setAlbumsPerPage,
  changeAlbumsSortType,
  changeAlbumsFilter,
  changeAlbumsUserNamesFilter,
} = albumsSlice.actions;

export default albumsSlice.reducer;
