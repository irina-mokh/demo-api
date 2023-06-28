import { createSlice } from '@reduxjs/toolkit';
import { getPosts } from './actions';
import { IPostsState } from '../../utils/types';

const initialState: IPostsState = {
  data: [],
  perPage: '10',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    editPost: (state, { payload }) => {
      const newArr = [...state.data];
      const index = newArr.findIndex((p) => p.id === payload.id);
      newArr[index] = { ...newArr[index], ...payload };
      state.data = newArr;
    },
    deletePost: (state, { payload }) => {
      const newArr = state.data.filter((post) => post.id !== payload);
      state.data = newArr;
    },
    setPostsPerPage: (state, { payload }) => {
      state.perPage = payload;
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

export const { editPost, deletePost, setPostsPerPage } = postsSlice.actions;

export default postsSlice.reducer;
