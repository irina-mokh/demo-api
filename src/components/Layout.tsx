import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout = () => {
  return (
    <div className="layout flex flex-col min-h-full mx-auto px-2 pt-2 max-w-6xl">
      <Header></Header>
      <Outlet />
    </div>
  );
};
