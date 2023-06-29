import { createSlice } from '@reduxjs/toolkit';
import { getTasks } from './actions';
import { ITasksState } from '../../utils/types';

const initialState: ITasksState = {
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

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getPosts
      .addCase(getTasks.pending, () => {
        // state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        // state.error = null;
        // state.data = [...payload];
        // state.display = [...payload];
      })
      .addCase(getTasks.rejected, () => {
        // state.error = String(payload);
      });
  },
});

export const {} = tasksSlice.actions;

export default tasksSlice.reducer;
