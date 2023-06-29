import { createSlice } from '@reduxjs/toolkit';
import { addPost, getPosts } from './actions';
import { IPostsState } from '../../utils/types';
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

const initialState: IPostsState = {
  data: [],
  display: [],
  perPage: '10',
  filter: {
    userNames: ['all'],
    title: '',
    favorite: false,
  },
  sort: 'ID',
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
    filterPosts: filter,
    changePostsSortType: changeSort,
    sortPosts: sort,
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
        state.display = [...payload];
      })
      .addCase(getPosts.rejected, (state, { payload }) => {
        // state.error = String(payload);
      })
      // addPost
      .addCase(addPost.pending, (state) => {
        // state.error = null;
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        // state.error = null;
        state.data = [...state.data, payload];
        // state.display = [...payload];
      })
      .addCase(addPost.rejected, (state, { payload }) => {
        // state.error = String(payload);
      });
  },
});

export const {
  editPost,
  deletePost,
  setPostsPerPage,
  filterPosts,
  changePostsFilter,
  changePostsSortType,
  sortPosts,
  changePostsUserNamesFilter,
} = postsSlice.actions;

export default postsSlice.reducer;
