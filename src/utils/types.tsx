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

export interface IPageFilter {
  perPage: string;
}
export interface IPostsState extends IPageFilter {
  data: Array<IPost>;
}

export interface RootState {
  posts: IPostsState;
  photos: [];
}

export type Pages = 'posts' | 'photos' | 'tasks';

export type IPerPageSelector = {
  // eslint-disable-next-line prettier/prettier
  [key in Pages]?: {
    value: string,
    handler: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  };
};
