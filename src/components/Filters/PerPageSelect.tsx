import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { AppDispatch } from '../../store';

import { Select } from '../Select';

import { Pages } from '../../utils/types';
import { HANDLERS } from '../../store';

const PER_PAGE_OPTIONS = [10, 20, 50, 100, 'all'];

export const PerPageSelect = () => {
  // eslint-disable-next-line prettier/prettier
  const page = useLocation().pathname.slice(1) as Pages;
  const dispatch: AppDispatch = useDispatch();

  const ls = localStorage.getItem('reduxState');
  const value =  ls ? JSON.parse(ls)[page].perPage : '';
  const handler = HANDLERS[page].perPage;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
    dispatch(handler(e.target.value));
  };
  
  const options = PER_PAGE_OPTIONS.map((opt) => (
    <option key={opt} value={opt}>
      {opt}
    </option>
  ));

  return (
    <Select label="Per page:"  options={options} handler={handleChange} value={value}/>
  );
};
