import { createSlice } from '@reduxjs/toolkit';
import { addPost, getPosts } from './actions';
import { IPostsState, IPost } from '../../utils/types';
import { POST_SORT_OPTIONS } from '../../utils';

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
    editPost: (state, { payload }) => {
      const newData = [...state.data];
      const iData = newData.findIndex((p) => p.id === payload.id);
      newData[iData] = { ...newData[iData], ...payload };
      state.data = newData;

      const newDisplay = [...state.data];
      const iDisplay = newDisplay.findIndex((p) => p.id === payload.id);
      newDisplay[iDisplay] = { ...newDisplay[iDisplay], ...payload };
      state.display = newDisplay;

    },
    deletePost: (state, { payload }) => {
      state.data = state.data.filter((post) => post.id !== payload);
      state.display = state.display.filter((post) => post.id !== payload);
    },
    setPostsPerPage: (state, { payload }) => {
      state.perPage = payload;
    },
    changeUserNamesFilter: (state, { payload }) => {
      state.filter = {
        ...state.filter,
        userNames: [...payload],
      };
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
        state.display = state.data.filter(p =>  state.filter.userNames.includes('all') ? true : state.filter.userNames.includes(p.userName)).filter(p => state.filter.title ? p.title.includes(state.filter.title) : true).filter(p => state.filter.favorite ? p.favorite : true);
    },
    changeSortType: (state, { payload }) => {
      state.sort = payload;
    },
    sortPosts: (state) => {
      const sortCb = POST_SORT_OPTIONS.filter(opt => opt.name == state.sort)[0].cb;
      state.display = [...state.display].sort(sortCb);
    }
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
        state.data = [ ...state.data, payload];
        // state.display = [...payload];
      })
      .addCase(addPost.rejected, (state, { payload }) => {
        // state.error = String(payload);
      });
    },
});

export const { editPost, deletePost, setPostsPerPage, filterPosts, changeFilter, changeSortType, sortPosts, changeUserNamesFilter } = postsSlice.actions;

export default postsSlice.reducer;
