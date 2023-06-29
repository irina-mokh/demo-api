import { POST_SORT_OPTIONS } from '.';

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
}

export interface ITask {
  id: number;
}

export interface IPageFilter {
  perPage: string;
}

export interface IPostsFilter extends IPageFilter {
  filter: {
    userNames: Array<string>;
    title: string;
    favorite: boolean;
  }
}

// PAGES STATES
export interface IPostsState extends IPostsFilter {
  data: Array<IPost>;
  display: Array<IPost>;
  sort: string;
}
export interface IPhotosState extends IPageFilter {
  data: Array<IAlbum>;
  display: Array<IAlbum>
}
export interface ITasksState extends IPageFilter {
  data: Array<ITask>;
  display: Array<ITask>
}

export interface RootState {
  posts: IPostsState;
  photos: IPhotosState;
  tasks: ITasksState;
}

export type Pages = 'posts' | 'photos' | 'tasks';

export type ISelectSelector = {
  // eslint-disable-next-line prettier/prettier
  [key in Pages]: {
    value: string,
    handler: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  };
};

export type SelectE = React.ChangeEvent<HTMLSelectElement>;

export type FilterType = keyof IPost;