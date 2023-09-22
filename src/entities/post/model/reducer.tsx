import { createSlice } from '@reduxjs/toolkit';
import { addPost, getAllPostsWithUserNames } from './actions';
import { IPostsState } from 'shared/utils/types';
import {
  changeSingleFilter,
  changeSort,
  changeUserFilter,
  deleteItem,
  editItem,
  setPerPage,
} from 'shared/utils/helpers';

const initialState: IPostsState = {
  data: [],
  perPage: '10',
  filter: {
    userNames: ['all'],
    title: '',
    favorite: false,
  },
  sort: 'ID',
  error: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    editPost: editItem,
    deletePost: deleteItem,
    setPostsPerPage: setPerPage,
    changePostsUserNamesFilter: changeUserFilter,
    changePostsFilter: changeSingleFilter,
    changePostsSortType: changeSort,
  },
  extraReducers: (builder) => {
    builder
      // getPosts
      .addCase(getAllPostsWithUserNames.pending, (state) => {
        state.error = null;
      })
      .addCase(getAllPostsWithUserNames.fulfilled, (state, { payload }) => {
        state.error = null;
        state.data = [...payload];
      })
      .addCase(getAllPostsWithUserNames.rejected, (state, { payload }) => {
        state.error = String(payload);
      })
      // addPost
      .addCase(addPost.pending, (state) => {
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.error = null;
        state.data = [...state.data, payload];
      })
      .addCase(addPost.rejected, (state, { payload }) => {
        state.error = String(payload);
      });
  },
});

export const {
  editPost,
  deletePost,
  setPostsPerPage,
  changePostsFilter,
  changePostsSortType,
  changePostsUserNamesFilter,
} = postsSlice.actions;

export default postsSlice.reducer;
