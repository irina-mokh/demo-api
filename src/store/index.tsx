import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts/reducer';
import photosReducer from './photos/reducer';
import tasksReducer from './tasks/reducer';
import usersReducer from './users/reducer';

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
    photos: photosReducer,
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
