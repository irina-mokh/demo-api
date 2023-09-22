import { NavItem } from 'shared/ui/NavItem';

const ROUTES = [
  {
    path: 'posts',
    text: 'Posts',
  },
  {
    path: 'albums',
    text: 'Albums',
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
