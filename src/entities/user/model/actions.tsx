// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/utils/axios';
import { AxiosError } from 'axios';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async function (arg, { rejectWithValue }) {
    try {
      const response = await api.get('users');
      return response.data;
    } catch (err) {
      // eslint-disable-next-line prettier/prettier
      return rejectWithValue((err as AxiosError).message);
    }
  }
);
