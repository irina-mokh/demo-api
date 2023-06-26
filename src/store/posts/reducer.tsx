import { createSlice } from '@reduxjs/toolkit';
import { getPosts } from './actions';
import { IPostsState } from '../../utils/types';

const initialState: IPostsState = {
  data: [],
};

export const postsSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setPageActive: (state, { payload }) => {
      // state.curPage = payload;
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

export const { setPageActive } = postsSlice.actions;

export default postsSlice.reducer;
