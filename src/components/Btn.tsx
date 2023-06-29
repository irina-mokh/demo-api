import cn from 'classnames';

type BtnProps = {
  text: string,
  handler?: () => void,
  type?: 'button' | 'submit' | 'reset',
  isActive?: boolean,
};
export const Btn = ({ text, handler, type, isActive }: BtnProps) => {
  const btnClasses = cn({
    'btn py-2 px-4 border-2 border-gray-200 text-gray-50  rounded-md hover:shadow-md hover:shadow-teal-700':
      true,
    'bg-teal-700': isActive,
  });
  return (
    <button type={type} onClick={handler} className={btnClasses}>
      {text}
    </button>
  );
};
