import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

type NavItemProps = {
  path: string,
  text: string,
};

export const NavItem = ({ path, text }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname.slice(1) == path;

  const tabClasses = cn({
    'px-5 py-3 font-bold text-xl hover:underline w-full block text-center rounded-t-md bg-gray-800':
      true,
    'text-teal-600 bg-opacity-100': isActive,
    'bg-opacity-60 text-gray-200 shadow-[inset_0_-2px_3px_rgba(0,0,0,0.2)]': !isActive,
  });
  return (
    <Link to={path} className={tabClasses}>
      {text}
    </Link>
  );
};
