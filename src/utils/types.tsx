export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
  favorite: boolean;
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
  amount: number;
}
export interface IPostsState {
  data: Array<IPost>;
}

export interface RootState {
  posts: IPostsState;
}
