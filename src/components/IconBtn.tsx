import { ChatBubbleLeftEllipsisIcon, CheckIcon, ChevronDownIcon, PencilIcon, StarIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';

const ICONS = {
  comments: <ChatBubbleLeftEllipsisIcon />,
  favorite: <StarIcon />,
  edit: <PencilIcon />,
  delete: <TrashIcon />,
  check: <CheckIcon />,
  cancel: <XMarkIcon />,
  down: <ChevronDownIcon />
};

type IconProps = {
  // eslint-disable-next-line prettier/prettier
  type: keyof typeof ICONS,
  handler?: (e: React.MouseEvent) => void,
  isActive?: boolean,
};


export const IconBtn = ({ type, handler, isActive }: IconProps) => {
  const btnClasses = cn({
    'btn p-2 w-9 h-9 mx-2 hover:child:stroke-teal-800 child:stroke-2 ': true,
    'child:stroke-teal-600': isActive,
    'rotate-180 transition-transform duration-300': isActive && type === 'down'
    });
  return <button className={btnClasses} onClick={handler}>{ICONS[type]}</button>;
};



