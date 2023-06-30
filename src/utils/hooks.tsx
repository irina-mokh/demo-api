import { IItem } from './types';

export function useItemsPerPage(
  display: Array<IItem>,
  perPage: number | string,
  page: number
): IItem[] {
  return perPage !== 'all' ? display.slice(page * +perPage, +perPage * (page + 1)) : display;
}
