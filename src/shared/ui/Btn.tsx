import cn from 'classnames';

type BtnProps = {
  text: string,
  handler?: (e: React.MouseEvent) => void,
  type?: 'button' | 'submit' | 'reset',
  disabled?: boolean,
  accent?: boolean,
};
export const Btn = ({ text, handler, type, disabled, accent }: BtnProps) => {
  const btnClasses = cn({
    'btn py-2 px-4 border-2 border-gray-50 text-gray-50  rounded-md hover:border-teal-400 hover:text-teal-400':
      true,
    'text-gray-500 border-slate-500': disabled,
    'bg-teal-700': accent,
  });
  return (
    <button type={type} onClick={handler} className={btnClasses}>
      {text}
    </button>
  );
};
