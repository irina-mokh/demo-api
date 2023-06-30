import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../store';
import { HANDLERS } from '../../store';

import { Select } from '../Select';

import { useLS, usePage } from '../../utils/hooks';

const PER_PAGE_OPTIONS = [10, 20, 50, 100, 'all'];

export const PerPageSelect = () => {
  const page = usePage();
  const dispatch: AppDispatch = useDispatch();

  const value = useLS(page).perPage;
  const handler = HANDLERS[page].perPage;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(handler(e.target.value));
  };

  const options = PER_PAGE_OPTIONS.map((opt) => (
    <option key={opt} value={opt}>
      {opt}
    </option>
  ));

  return <Select label="Per page:" options={options} handler={handleChange} value={value} />;
};
