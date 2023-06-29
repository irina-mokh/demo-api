import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from './actions';
import { IUsersState } from '../../utils/types';

const initialState: IUsersState = {
  data: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setTasksPerPage: (state, { payload }) => {
      // state.perPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getPosts
      .addCase(getUsers.pending, (state) => {
        // state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        // state.error = null;
        state.data = [...payload];
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        // state.error = String(payload);
      });
  },
});

export const { setTasksPerPage } = usersSlice.actions;

export default usersSlice.reducer;