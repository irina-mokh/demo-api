import { createSlice } from '@reduxjs/toolkit';
import { getPosts } from './actions';
import { IPostsState, IPost } from '../../utils/types';

const initialState: IPostsState = {
  data: [],
  display: [],
  perPage: '10',
  filter: {
    userName: '',
    title: '',
    favorite: false,
  },
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
    filterPosts: (state, { payload }) => {
      const { value } = payload;
      // eslint-disable-next-line prettier/prettier
      const prop = payload.prop as keyof IPost;
      state.filter = {
        ...state.filter,
        [prop]: value,
      };
      // eslint-disable-next-line prettier/prettier
      state.display = state.data.filter((post) => post[prop] === value);
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
        state.display = [...payload];
      })
      .addCase(getPosts.rejected, (state, { payload }) => {
        // state.error = String(payload);
      });
  },
});

export const { editPost, deletePost, setPostsPerPage, filterPosts } = postsSlice.actions;

export default postsSlice.reducer;
