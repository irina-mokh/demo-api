import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout = () => {
  return (
    <div className="flex flex-col mx-auto px-2 max-w-5xl">
      <Header></Header>
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
};
