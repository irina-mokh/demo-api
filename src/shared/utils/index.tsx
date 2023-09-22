import { ISameItems, ITask } from './types';

type OptionItemsType = {
  name: string,
  cb: (a: ISameItems, b: ISameItems) => 1 | -1 | number,
};

type OptionTaskType = {
  name: string,
  cb: (a: ITask, b: ITask) => 1 | -1 | number,
};
const basicOptions: OptionItemsType[] = [
  { name: 'ID', cb: (a: ISameItems, b: ISameItems) => a.id - b.id },
  { name: 'ID descending', cb: (a: ISameItems, b: ISameItems) => b.id - a.id },
  { name: 'title a-z', cb: (a: ISameItems, b: ISameItems) => (a.title > b.title ? 1 : -1) },
  { name: 'title z-a', cb: (a: ISameItems, b: ISameItems) => (b.title > a.title ? 1 : -1) },
  {
    name: 'userName a-z',
    cb: (a: ISameItems, b: ISameItems) => (a.userName > b.userName ? 1 : -1),
  },
  {
    name: 'userName z-a',
    cb: (a: ISameItems, b: ISameItems) => (b.userName > a.userName ? 1 : -1),
  },
];

const tasksOptions: OptionTaskType[] = [
  { name: 'title a-z', cb: (a: ITask, b: ITask) => (a.title > b.title ? 1 : -1) },
  { name: 'title z-a', cb: (a: ITask, b: ITask) => (b.title > a.title ? 1 : -1) },
  { name: 'done last', cb: (a: ITask, b: ITask) => (a.completed > b.completed ? 1 : -1) },
  { name: 'done first', cb: (a: ITask, b: ITask) => (b.completed > a.completed ? 1 : -1) },
];
export const SORT_OPTIONS = {
  posts: basicOptions,
  albums: basicOptions,
  tasks: tasksOptions,
};
