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

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
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
}
