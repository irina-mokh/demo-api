import { useEffect } from 'react';

type PageProps = {
  title: string,
  children: React.ReactNode,
};
export const Page = ({ title, children }: PageProps) => {
  useEffect(() => {
    document.title = title || '';
  }, [title]);

  return (
    <main className="page p-4 bg-gray-800 grow">
      <h2 className="visually-hidden">{title}</h2>
      {children}
    </main>
  );
};
