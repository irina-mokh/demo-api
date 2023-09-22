// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'shared/utils/axios';
import { AxiosError } from 'axios';
import { IAlbum, IUser } from 'shared/utils/types';

export const getAlbums = createAsyncThunk(
  'albums/getAlbums',
  async function (users: IUser[], { rejectWithValue }) {
    try {
      const response = await api.get('albums');
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

export const getPhotos = createAsyncThunk(
  'albums/getPhotos',
  async function (id:number, { rejectWithValue }) {
    try {
      const response = await api.get(`albums/${id}/photos`);
      return response.data;
    } catch (err) {
      // eslint-disable-next-line prettier/prettier
      return rejectWithValue((err as AxiosError).message);
    }
  }
);
