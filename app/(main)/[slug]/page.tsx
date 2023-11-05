interface HabitsPageProps {
  params: {
    slug: string;
  };
}

const HabitsPage = ({ params: { slug } }: HabitsPageProps) => {
  return <div>{slug}</div>;
};

export default HabitsPage;
