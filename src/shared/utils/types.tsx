/* eslint-disable @typescript-eslint/no-explicit-any */
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
  title: string;
  completed: boolean;
  userId: number;
  userName: string;
  favorite: boolean;
  body: string;
}

export interface IBaseFilter {
  perPage: string;
  sort: string;
  error: string | null,
}

export interface IExtraFilter extends IBaseFilter {
  filter: {
    userNames: Array<string>;
    title: string;
    favorite: boolean;
  }
}

// PAGES STATES
export interface IPostsState extends IExtraFilter {
  data: Array<IPost>;
}
export interface IAlbumsState extends IExtraFilter {
  data: Array<IAlbum>;
  photos: Array<IPhoto>
}
export interface ITasksState extends IBaseFilter {
  data: Array<ITask>;
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

export type AddTaskInputs = {
  title: string,
};

export type Filters = 'userNames' | 'favorite' | 'title';
export type Pages = 'posts' | 'albums' | 'tasks';

export type ISameItems = IPost | IAlbum;
export type IItem =  ISameItems| ITask;

export type ISameItemsState = IAlbumsState | IPostsState;
export type IItemsState =  ISameItemsState | ITasksState;

export type IExtraFilterHANDLERS  = {
  [key in Pages]: {
    perPage: any,
    sort: any,
    userNames?: any, 
    title?: any, 
    favorite?: any, 
  }
};

export type SelectE = React.ChangeEvent<HTMLSelectElement>;

export type FilterType = keyof IPost;