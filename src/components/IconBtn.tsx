import { ChatBubbleLeftEllipsisIcon, CheckIcon, PencilIcon, StarIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';

const ICONS = {
  comments: <ChatBubbleLeftEllipsisIcon />,
  favorite: <StarIcon />,
  edit: <PencilIcon />,
  delete: <TrashIcon />,
  check: <CheckIcon />,
  cancel: <XMarkIcon />
};

type IconProps = {
  // eslint-disable-next-line prettier/prettier
  type: keyof typeof ICONS,
  handler?: () => void,
  isActive?: boolean,
};


export const IconBtn = ({ type, handler, isActive }: IconProps) => {
  const btnClasses = cn({
    'btn p-2 w-9 h-9 mx-2 hover:child:stroke-teal-800 child:stroke-2': true,
    'child:stroke-teal-600': isActive,
    });
  return <button className={btnClasses} onClick={handler}>{ICONS[type]}</button>;
};



