import { useLocation } from 'react-router-dom';
import { IItem, Pages } from './types';
import { store } from 'app/store';

export function useItemsPerPage(
  display: Array<IItem>,
  perPage: number | string,
  page: number
): IItem[] {
  return perPage !== 'all' ? display.slice(page * +perPage, +perPage * (page + 1)) : display;
}

export function usePage() {
  // eslint-disable-next-line prettier/prettier
  return useLocation().pathname.slice(1) as Pages;
}

export function useLS(){
  const ls = localStorage.getItem('reduxState');
  return ls ? JSON.parse(ls) : store.getState();
}