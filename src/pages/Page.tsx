import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { selectUsers } from '../store/users/selectors';
import { getUsers } from '../store/users/actions';

type PageProps = {
  title: string,
  children: React.ReactNode,
};
export const Page = ({ title, children }: PageProps) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    document.title = title || '';
  }, [title]);

  const { data: users } = useSelector(selectUsers);

  useEffect(() => {
    if (!users.length) {
      dispatch(getUsers());
    }
  }, []);

  return (
    <main className="page p-4 bg-gray-800 grow">
      <h2 className="visually-hidden">{title}</h2>
      {children}
    </main>
  );
};
