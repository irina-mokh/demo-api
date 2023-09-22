import { createSlice } from '@reduxjs/toolkit';
import { addTask, getTasks } from './actions';
import { ITasksState } from 'utils/types';
import { editItem, deleteItem, setPerPage, changeSort } from 'utils/helpers';

const initialState: ITasksState = {
  data: [],
  perPage: '10',
  sort: 'done last',
  error: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    editTask: editItem,
    deleteTask: deleteItem,
    setTasksPerPage: setPerPage,
    changeTasksSortType: changeSort,
  },
  extraReducers: (builder) => {
    builder
      // getTasks
      .addCase(getTasks.pending, (state) => {
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        state.error = null;
        state.data = [...payload];
      })
      .addCase(getTasks.rejected, (state, { payload }) => {
        state.error = String(payload);
      })
      // addTask
      .addCase(addTask.pending, (state) => {
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, { payload }) => {
        state.error = null;
        state.data = [...state.data, payload];
      })
      .addCase(addTask.rejected, (state, { payload }) => {
        state.error = String(payload);
      });
  },
});

export const { editTask, deleteTask, setTasksPerPage, changeTasksSortType } = tasksSlice.actions;

export default tasksSlice.reducer;
