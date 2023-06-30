import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, HANDLERS } from '../../store';
import { selectUsers } from '../../store/users/selectors';

import { IconBtn } from '../IconBtn';
import { useLS, usePage } from '../../utils/hooks';

export const UserFilter = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: users } = useSelector(selectUsers);
  const page = usePage();

  const values = useLS()[page].filter.userNames;
  const handler = HANDLERS[page].userNames;

  const [isList, setIsList] = useState(false);
  // create a local state for selection
  const [selected, setSelected] = useState<Set<string>>(new Set(values));

  // create options depending on userNames in global state
  const arr = ['all', ...users.map((user) => user.name)];

  const options = arr.map((opt) => {
    const handleChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
      // create copy of selected Set to mutate
      const setCopy = new Set(selected);
      if (opt === 'all' && e.target.checked) {
        //uncheck all options on All checked
        setCopy.clear();
        setCopy.add('all');
      } else {
        // uncheck All option when UserName checked
        setCopy.delete('all');
        if (e.target.checked) {
          setCopy.add(opt);
        } else {
          setCopy.delete(opt);
        }
      }
      setSelected(setCopy);
    };

    return (
      <li className="option" key={opt}>
        <input
          name="user"
          id={opt}
          type="checkbox"
          checked={selected.has(opt)}
          onChange={handleChoice}
          className="mr-2 w-4 h-4 accent-teal-600"
        />
        <label htmlFor={opt}>{opt}</label>
      </li>
    );
  });

  const toggleList = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsList(!isList);

    // dispatch selection changes on list closing
    if (isList) dispatch(handler(Array.from(selected)));
  };

  return (
    <div className="user-select relative">
      <legend>By users:</legend>
      <p
        className="border-2 rounded-md p-1 max-w-[250px] min-w-[220px] h-[35px] overflow-hidden ml-auto flex justify-between items-center"
        onClick={() => {
          setIsList(!isList);
        }}
      >
        {values.join(', ')}
        <IconBtn type="down" isActive={isList} handler={toggleList} />
      </p>
      {isList && (
        <div className="absolute t-2 p-2 w-full bg-slate-700 text-gray-100 z-10">
          <ul>{options}</ul>
        </div>
      )}
    </div>
  );
};
