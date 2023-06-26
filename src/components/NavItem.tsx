import { Link } from 'react-router-dom';

type NavItemProps = {
  path: string,
  text: string,
};

export const NavItem = ({ path, text }: NavItemProps) => {
  return (
    <Link to={path} className="p-3 font-bold text-xl hover:text-emerald-300">
      {text}
    </Link>
  );
};
