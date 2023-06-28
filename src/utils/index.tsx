import { IPost } from './types';

export const POST_SORT_OPTIONS = [
  { name: 'ID', cb: (a: IPost, b: IPost) => a.id - b.id },
  { name: 'ID descending', cb: (a: IPost, b: IPost) => b.id - a.id },
  { name: 'title a-z', cb: (a: IPost, b: IPost) => (a.title > b.title ? 1 : -1) },
  { name: 'title z-a', cb: (a: IPost, b: IPost) => (b.title > a.title ? 1 : -1) },
  { name: 'userName a-z', cb: (a: IPost, b: IPost) => (a.userName > b.userName ? 1 : -1) },
  { name: 'userName z-a', cb: (a: IPost, b: IPost) => (b.userName > a.userName ? 1 : -1) },
];
