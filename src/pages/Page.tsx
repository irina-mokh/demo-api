type PageProps = {
  title: string,
  children: React.ReactNode,
};
export const Page = ({ title, children }: PageProps) => {
  return (
    <main className="p-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </main>
  );
};
