// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/utils/axios';
import { AxiosError } from 'axios';
import { ITask } from 'shared/utils/types';

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async function (arg, { rejectWithValue }) {
    try {
      const response = await api.get('todos');
      return response.data;
    } catch (err) {
      // eslint-disable-next-line prettier/prettier
      return rejectWithValue((err as AxiosError).message);
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async function (task: ITask, { rejectWithValue }) {
    try {
      await api.post(`todos`, task);
      return task;
    } catch (err) {
      // eslint-disable-next-line prettier/prettier
      return rejectWithValue((err as AxiosError).message);
    }
  }
);
