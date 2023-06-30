// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/axios';
import { AxiosError } from 'axios';
import { IPost, IUser } from '../../utils/types';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async function (users: IUser[], { rejectWithValue }) {
    try {
      const response = await api.get(`posts`);
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