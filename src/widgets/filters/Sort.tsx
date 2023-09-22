import { useDispatch } from 'react-redux';
import { AppDispatch, HANDLERS } from 'app/store';

import { Select } from 'shared/ui/Select';
import { useLS, usePage } from 'utils/hooks';
import { SORT_OPTIONS } from 'utils';

export const Sort = () => {
  const dispatch: AppDispatch = useDispatch();
  const page = usePage();
  const value = useLS()[page].sort;
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
    <Select
      handler={handleSortChange}
      value={String(value)}
      label="Sort by:"
      options={sortOptions}
    />
  );
};
