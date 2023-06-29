import { configureStore } from '@reduxjs/toolkit';
import postsReducer, {
  changePostsFilter,
  changePostsSortType,
  changePostsUserNamesFilter,
  setPostsPerPage,
} from './posts/reducer';
import albumsReducer, {
  changeAlbumsFilter,
  changeAlbumsSortType,
  changeAlbumsUserNamesFilter,
  setAlbumsPerPage,
} from './albums/reducer';
import tasksReducer from './tasks/reducer';
import usersReducer from './users/reducer';
import { IFilterHANDLERS } from '../utils/types';

const persistedState = () => {
  let state;
  const value = localStorage.getItem('reduxState');
  if (typeof value === 'string') {
    state = JSON.parse(value);
  } else {
    state = {};
  }
  return state;
};

export const store = configureStore({
  preloadedState: persistedState(),
  reducer: {
    posts: postsReducer,
    albums: albumsReducer,
    tasks: tasksReducer,
    users: usersReducer,
  },
});

store.subscribe(() => {
  // console.log('persist:', store.getState());
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const HANDLERS: IFilterHANDLERS = {
  posts: {
    perPage: setPostsPerPage,
    sort: changePostsSortType,
    userNames: changePostsUserNamesFilter,
    favorite: changePostsFilter,
    title: changePostsFilter,
  },
  albums: {
    perPage: setAlbumsPerPage,
    sort: changeAlbumsSortType,
    userNames: changeAlbumsUserNamesFilter,
    favorite: changeAlbumsFilter,
    title: changeAlbumsFilter,
  },
};
