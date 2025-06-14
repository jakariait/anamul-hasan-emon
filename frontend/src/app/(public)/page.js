export const dynamic = "force-dynamic"; // Ensures fresh fetch on every request


import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import Testimonial from "@/components/Testimonials";
import WorkingProcess from "@/components/WorkingProcess";
import ToolsSection from "@/components/ToolsSection";
import Results from "@/components/Results";
import FaqAccordion from "@/components/FaqAccordion";
import PricingPlans from "@/components/PricingSection";
import WhatBusinessOwnersWant from "@/components/WhatBusinessOwnersWant";
import CallToAction from "@/components/CallToAction";
import Stats from "@/components/Stats";
import { getStats } from "@/utils/getPageContentData";

const Page = async () => {
  const stats = await getStats();

  return (
    <div>
      <Hero />
      <Stats getStats={stats} />
      <Services />
      <Clients />
      <Testimonial />
      <Results />
      <WorkingProcess />
      <ToolsSection />
      <WhatBusinessOwnersWant />
      <PricingPlans />
      <FaqAccordion />
      <CallToAction />
    </div>
  );
};

export default Page;
