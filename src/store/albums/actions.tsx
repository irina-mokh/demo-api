// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/axios';
import { AxiosError } from 'axios';
import { IAlbum, IUser } from '../../utils/types';

export const getAlbums = createAsyncThunk(
  'albums/getAlbums',
  async function (users: IUser[], { rejectWithValue }) {
    try {
      const response = await api.get('albums');
      console.log(response.data);
      const albums = response.data.map((post: IAlbum) => {
        const modifiedItem = {
          ...post,
          userName: users.filter(u => u.id === post.userId)[0].name,
          favorite: false,
        };
        return modifiedItem;
      });
      return albums;
    } catch (err) {
      // eslint-disable-next-line prettier/prettier
      return rejectWithValue((err as AxiosError).message);
    }
  }
);
