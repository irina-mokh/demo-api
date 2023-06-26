export type Post = {
  userId: number,
  id: number,
  title: string,
  body: string,
};

export interface IPageFilter {
  amount: number;
}
export interface IPostsState {
  data: Array<Post>;
}

export interface RootState {
  posts: IPostsState;
}
