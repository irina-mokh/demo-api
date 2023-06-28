type BtnProps = {
  text: string,
  handler: () => void,
};
export const Btn = ({ text, handler }: BtnProps) => {
  return (
    <button
      onClick={handler}
      className="py-2 px-4 border-2 border-gray-200 hover:border-teal-600 rounded-md hover:text-teal-600"
    >
      {text}
    </button>
  );
};
