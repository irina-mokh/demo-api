import { NavItem } from './NavItem';

const ROUTES = [
  {
    path: 'posts',
    text: 'Posts',
  },
  {
    path: 'photos',
    text: 'Photos',
  },
  {
    path: 'tasks',
    text: 'Tasks',
  },
];
export const Header = () => {
  const tabs = ROUTES.map((route, i) => (
    <li key={i}>
      <NavItem {...route} />
    </li>
  ));
  return (
    <header className="py-3">
      <nav className="">
        <ul className="flex justify-between">{tabs}</ul>
      </nav>
    </header>
  );
};
