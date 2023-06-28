// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/axios';
import { AxiosError } from 'axios';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async function (arg, { rejectWithValue }) {
    try {
      const response = await api.get('posts');
      return response.data;
    } catch (err) {
      // eslint-disable-next-line prettier/prettier
      return rejectWithValue((err as AxiosError).message);
    }
  }
);
