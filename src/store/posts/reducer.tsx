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
    changeFilter: (state, { payload }) => {
      const { value } = payload;
      // eslint-disable-next-line prettier/prettier
      const prop = payload.prop as keyof IPost;
      state.filter = {
        ...state.filter,
        [prop]: value,
      };
    },
    // filter posts using all filters
    filterPosts: (state) => {
        state.display = state.data.filter(p =>  state.filter.userName === 'all' ? true : p.userName === state.filter.userName).filter(p => state.filter.title ? p.title.includes(state.filter.title) : true).filter(p => state.filter.favorite ? p.favorite : true);
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

export const { editPost, deletePost, setPostsPerPage, filterPosts, changeFilter } = postsSlice.actions;

export default postsSlice.reducer;
