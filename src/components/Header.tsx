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
    <li key={i} className="grow">
      <NavItem {...route} />
    </li>
  ));
  return (
    <header className="">
      <nav>
        <ul className="flex justify-between gap-1">{tabs}</ul>
      </nav>
    </header>
  );
};
