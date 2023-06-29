import { current } from '@reduxjs/toolkit';
import { Btn } from './Btn';

type PaginationProps = {
  setPage: (n: number) => void,
  length: number,
  perPage: number,
  currentP: number,
};
export const Pagination = ({ length, setPage, perPage, currentP }: PaginationProps) => {
  const pages = Array.from(Array(Math.ceil(length / perPage)).keys());
  const pagesEls = pages.map((n) => (
    <Btn text={String(n + 1)} handler={() => setPage(n)} isActive={n == currentP} />
  ));
  return <div className="pagination child:mx-1 mt-4 w-full">{pagesEls}</div>;
};
