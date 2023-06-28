import { createSlice } from '@reduxjs/toolkit';
import { getPhotos } from './actions';
import { IPhotosState } from '../../utils/types';

const initialState: IPhotosState = {
  data: [],
  display: [],
  perPage: '10',
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setPhotosPerPage: (state, { payload }) => {
      state.perPage = payload;
    },
    filterPhotos: (state, { payload }) => {
      const { prop, value } = payload;
      // eslint-disable-next-line prettier/prettier
      // state.display = state.data.filter((post) => post[prop as keyof IPhoto] === value);
    },
  },
  extraReducers: (builder) => {
    builder
      // getPosts
      .addCase(getPhotos.pending, (state) => {
        // state.error = null;
      })
      .addCase(getPhotos.fulfilled, (state, { payload }) => {
        // state.error = null;
        // state.data = [...payload];
        // state.display = [...payload];
      })
      .addCase(getPhotos.rejected, (state, { payload }) => {
        // state.error = String(payload);
      });
  },
});

export const { setPhotosPerPage, filterPhotos } = photosSlice.actions;

export default photosSlice.reducer;
