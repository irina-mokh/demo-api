import { Btn } from './Btn';

type PaginationProps = {
  setPage: (n: number) => void,
  length: number,
  perPage: string,
  currentP: number,
};
export const Pagination = ({ length, setPage, perPage, currentP }: PaginationProps) => {
  const count = perPage !== 'all' ? length / +perPage : 1;

  const pages = Array.from(Array(Math.ceil(count)).keys());
  const pagesEls = pages.map((n) => (
    <Btn key={n} text={String(n + 1)} handler={() => setPage(n)} isActive={n == currentP} />
  ));
  return <div className="pagination child:mx-1 mt-4 w-full">{pagesEls}</div>;
};
