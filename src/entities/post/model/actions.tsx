// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/utils/axios';
import { AxiosError } from 'axios';
import { IPost, IUser } from 'shared/utils/types';

export const getAllPostsWithUserNames = createAsyncThunk(
  'posts/getAllPostsWithUserNames',
  // get ALL POSTS to have data for filter and sort
  async function (users: IUser[], { rejectWithValue }) {
    console.log('get posts');
    try {
      const response = await api.get(`posts`);
      // set with userName to store
      const posts = response.data.map((post: IPost) => {
        const modifiedPost = {
          ...post,
          userName: users.filter(u => u.id === post.userId)[0].name,
          favorite: false,
        };
        return modifiedPost;
      });
      return posts;
    } catch (err) {
      // eslint-disable-next-line prettier/prettier
      return rejectWithValue((err as AxiosError).message);
    }
  }
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async function (post: IPost, { rejectWithValue }) {
    try {
      await api.post(`posts`, post);
      return post;
    } catch (err) {
      // eslint-disable-next-line prettier/prettier
      return rejectWithValue((err as AxiosError).message);
    }
  }
);