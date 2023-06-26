import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-full mx-auto px-2 max-w-6xl">
      <Header></Header>
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
};
