import { Header } from "./_components/header";

interface SlugLayoutProps {
  params: {
    slug: string;
  };
  children: React.ReactNode;
}
const SlugLayout = ({ params: { slug }, children }: SlugLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b border-neutral-700 bg-neutral-800 p-4 md:p-8">
        <Header slug={slug} />
      </div>

      <div className="p-4 py-8 md:p-8 md:py-16">
        <div className="mx-auto max-w-[876px]">{children}</div>
      </div>
    </div>
  );
};

export default SlugLayout;
