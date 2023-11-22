import { Demo } from "./_components/demo";
import { Quote } from "./_components/quote";
import { Hero } from "./_components/hero";

const MarketingPage = async () => {
  return (
    <div className="space-y-24">
      <Hero />
      <Demo />
      <Quote />
    </div>
  );
};

export default MarketingPage;
