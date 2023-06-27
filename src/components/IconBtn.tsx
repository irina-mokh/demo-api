import { ChatBubbleLeftEllipsisIcon, PencilIcon, StarIcon, TrashIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';

const ICONS = {
  comments: <ChatBubbleLeftEllipsisIcon />,
  favorite: <StarIcon />,
  edit: <PencilIcon />,
  delete: <TrashIcon />,
};

type IconProps = {
  // eslint-disable-next-line prettier/prettier
  type: keyof typeof ICONS,
  handler?: () => void,
  isActive?: boolean,
};


export const IconBtn = ({ type, handler, isActive }: IconProps) => {
  const btnClasses = cn({
    'btn p-2 w-9 h-9 mx-2 rounded-md hover:child:stroke-teal-600': true,
    'child:stroke-teal-700 bg-gray-200': isActive,
    });
  return <button className={btnClasses} onClick={handler}>{ICONS[type]}</button>;
};



