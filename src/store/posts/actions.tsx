// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/axios';
import { AxiosError } from 'axios';
import { IPost } from '../../utils/types';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async function (arg, { rejectWithValue }) {
    try {
      const response = await api.get(`posts`);
      const posts = response.data.map(async(post: IPost) => {
        const resUser = await api.get(`users/${post.userId}`);
        const modifiedPost = {
          ...post,
          userName: resUser.data.name,
          favorite: false,
        };
        return modifiedPost;
      });
      return Promise.all(posts);
    } catch (err) {
      // eslint-disable-next-line prettier/prettier
      return rejectWithValue((err as AxiosError).message);
    }
  }
);

export const getUser = createAsyncThunk(
  'posts/getUser',
  async function (userId, { rejectWithValue }) {
    try {
      const response = await api.get(`users/${userId}`);
      return response.data;
    } catch (err) {
      // eslint-disable-next-line prettier/prettier
      return rejectWithValue((err as AxiosError).message);
    }
  }
);
