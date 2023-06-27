import { createSlice } from '@reduxjs/toolkit';
import { getPosts } from './actions';
import { IPostsState } from '../../utils/types';

const initialState: IPostsState = {
  data: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleFavorite: (state, { payload }) => {
      const newArr = [...state.data];
      const index = newArr.findIndex((p) => (p.id = payload));
      const curValue = newArr[index].favorite;
      newArr[index].favorite = !curValue;
      state.data = newArr;
    },
  },
  extraReducers: (builder) => {
    builder
      // getPosts
      .addCase(getPosts.pending, (state) => {
        // state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        // state.error = null;
        state.data = [...payload];
      })
      .addCase(getPosts.rejected, (state, { payload }) => {
        // state.error = String(payload);
      });
  },
});

export const { toggleFavorite } = postsSlice.actions;

export default postsSlice.reducer;
