import { useDispatch, useSelector } from 'react-redux';
import { Select } from '../Select';
import { selectPosts } from '../../store/posts/selectors';
import { AppDispatch } from '../../store';
import { changeFilter } from '../../store/posts/reducer';

export const UserFilter = () => {
  const dispatch: AppDispatch = useDispatch();

  const {
    data,
    filter: { userName },
  } = useSelector(selectPosts);
  const options = Array.from(new Set(data.map((post) => post.userName))).map((opt) => (
    <option key={opt} value={String(opt)}>
      {opt}
    </option>
  ));

  options.unshift(
    <option key="all" value="all">
      All
    </option>
  );

  const handleFilterByUserName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeFilter({ prop: 'userName', value: e.target.value }));
  };
  return (
    <Select
      handler={handleFilterByUserName}
      options={options}
      value={userName}
      label="By user name"
    />
  );
};
