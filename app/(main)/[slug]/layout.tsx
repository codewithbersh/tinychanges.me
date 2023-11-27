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
      <Header slug={slug} />
      <main>{children}</main>
    </div>
  );
};

export default SlugLayout;
