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
  disabled?: boolean,
};


export const IconBtn = ({ type, handler, isActive, disabled }: IconProps) => {
  const btnClasses = cn({
    'btn mx-2 hover:child:stroke-teal-800 child:stroke-gray-200 child:stroke-2 ': !disabled,
    'child:stroke-teal-600': isActive,
    'child:stroke-gray-600': disabled,
    'p-2 w-9 h-9': type !== "down",
    'h-[24px] w-[24px] p-0': type === "down",
    'rotate-180 transition-transform duration-300': isActive && type === 'down'
    });
  return <button className={btnClasses} onClick={handler} disabled={disabled} >{ICONS[type]}</button>;
};



