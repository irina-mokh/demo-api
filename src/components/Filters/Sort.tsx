import { useDispatch } from 'react-redux';
import { AppDispatch, HANDLERS } from '../../store';
import { SORT_OPTIONS } from '../../utils';
import { Select } from '../Select';
import { useLocation } from 'react-router-dom';
import { Pages } from '../../utils/types';

export const Sort = () => {
  const dispatch: AppDispatch = useDispatch();
  // eslint-disable-next-line prettier/prettier
  const page = useLocation().pathname.slice(1) as Pages;
  const ls = localStorage.getItem('reduxState');
  const value =  ls ? JSON.parse(ls)[page].sort : '';
  const handler = HANDLERS[page].sort;

  const sortOptions = SORT_OPTIONS[page].map((opt) => (
    <option key={opt.name} value={String(opt.name)}>
      {opt.name}
    </option>
  ));
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(handler(e.target.value));
  };
  return (
    <Select handler={handleSortChange} value={String(value)} label="Sort by:" options={sortOptions} />
  );
};
