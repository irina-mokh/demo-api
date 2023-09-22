import { AppDispatch } from 'app/store';
import { getUsers } from 'entities/user/model/actions';
import { selectUsers } from 'entities/user/model/selectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type PageProps = {
  title: string,
  children: React.ReactNode,
};
const Page = ({ title, children }: PageProps) => {
  useEffect(() => {
    document.title = title || '';
  }, [title]);

  const dispatch: AppDispatch = useDispatch();
  const { data: users } = useSelector(selectUsers);
  useEffect(() => {
    if (!users.length) {
      dispatch(getUsers());
    }
  }, []);
  return (
    <main className="page p-4 bg-gray-800 grow overflow-x-hidden">
      <h2 className="visually-hidden">{title}</h2>
      {children}
    </main>
  );
};

export default Page;
