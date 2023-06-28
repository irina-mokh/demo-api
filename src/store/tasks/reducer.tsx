import { createSlice } from '@reduxjs/toolkit';
import { getTasks } from './actions';
import { ITasksState } from '../../utils/types';

const initialState: ITasksState = {
  data: [],
  display: [],
  perPage: '10',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasksPerPage: (state, { payload }) => {
      state.perPage = payload;
    },
    filterTasks: (state, { payload }) => {
      const { prop, value } = payload;
      // eslint-disable-next-line prettier/prettier
      // state.display = state.data.filter((post) => post[prop as keyof IPost] === value);
    },
  },
  extraReducers: (builder) => {
    builder
      // getPosts
      .addCase(getTasks.pending, (state) => {
        // state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        // state.error = null;
        // state.data = [...payload];
        // state.display = [...payload];
      })
      .addCase(getTasks.rejected, (state, { payload }) => {
        // state.error = String(payload);
      });
  },
});

export const { setTasksPerPage, filterTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
