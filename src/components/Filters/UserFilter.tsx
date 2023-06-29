import { useDispatch, useSelector } from 'react-redux';
import { Select } from '../Select';
import { selectPosts } from '../../store/posts/selectors';
import { AppDispatch } from '../../store';
import { changeUserNamesFilter } from '../../store/posts/reducer';
import { useState, useEffect } from 'react';
import { IconBtn } from '../IconBtn';

export const UserFilter = () => {
  const dispatch: AppDispatch = useDispatch();

  const [isList, setIsList] = useState(false);
  // create a local state for selection
  const [selected, setSelected] = useState<Set<string>>(new Set(['all']));

  // create options depending on userNames in global state
  const {
    data,
    filter: { userNames },
  } = useSelector(selectPosts);
  const arr = ['all', ...Array.from(new Set(data.map((post) => post.userName)))];

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
    if (isList) dispatch(changeUserNamesFilter(Array.from(selected)));
  };

  return (
    <fieldset className="user-select relative w-[300px]">
      <legend>By users:</legend>
      <p
        className="border-2 rounded-md p-1 flex justify-between items-center"
        onClick={() => {
          setIsList(!isList);
        }}
      >
        {userNames.join(', ')}
        <IconBtn type="down" isActive={isList} handler={toggleList} />
      </p>
      {isList && (
        <div className="absolute t-2 p-2 w-full bg-slate-700 text-gray-100 z-10">
          <ul>{options}</ul>
        </div>
      )}
    </fieldset>
  );
};
