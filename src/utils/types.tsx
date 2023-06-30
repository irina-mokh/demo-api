/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

/* eslint-disable prettier/prettier */
export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
  favorite: boolean;
  userName: string;
}

export interface IUser {
  id: number;
  name: string;
}

export interface IComment {
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface IAlbum {
  id: number;
  userId: number;
  title: string;
  userName: string;
  favorite: boolean;
  body: string;
}

export interface IPhoto {
  id: number,
  albumId: number,
  thumbnailUrl: string,
  title: string,
  url: string,
}

export interface ITask {
  id: number;
}

export interface IPageFilter {
  perPage: string;
}

export interface IFilter extends IPageFilter {
  filter: {
    userNames: Array<string>;
    title: string;
    favorite: boolean;
  },
  sort: string;
}

// PAGES STATES
export interface IPostsState extends IFilter {
  data: Array<IPost>;
  display: Array<IPost>;
}
export interface IAlbumsState extends IFilter {
  data: Array<IAlbum>;
  display: Array<IAlbum>;
  photos: Array<IPhoto>
}
export interface ITasksState extends IFilter {
  data: Array<ITask>;
  display: Array<ITask>
}

export interface IUsersState {
  data: Array<IUser>;
}

export interface RootState {
  posts: IPostsState;
  albums: IAlbumsState;
  tasks: ITasksState;
  users: IUsersState;
}

export type AddPostInputs = {
  title: string,
  userName: string,
  body: string,
};

export type Filters = 'userNames' | 'favorite' | 'title';
export type Pages = 'posts' | 'albums';

export type IItem = IPost | IAlbum;
export type IItemsState = IAlbumsState | IPostsState;

// export type FilterHandle = {
//   // value: string | boolean | string[],
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   handler: any,
// };
export type IFilterHANDLERS  = {
  [ket in Pages]: {
    perPage: any,
    sort: any,
    userNames: any, 
    title: any, 
    favorite: any, 
  }
};

export type SelectE = React.ChangeEvent<HTMLSelectElement>;

export type FilterType = keyof IPost;