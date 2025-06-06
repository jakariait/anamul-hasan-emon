import React from "react";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";

const steps = [
  {
    title: "Discovery & Business Understanding",
    description:
      "We begin by understanding your business, audience, and goals. We ensure that the strategy is aligned with your unique needs.",
  },
  {
    title: "Market & Competitor Research",
    description:
      "We dive deep into your industry, analyze your competitors, and use this data to craft a smart, data-driven performance plan.",
  },
  {
    title: "Creative & Copy Strategy",
    description:
      "I design scroll-stopping creatives and write persuasive ad copy that connects emotionally and converts.",
  },
  {
    title: "Campaign Setup & Launch",
    description:
      "From pixel setup to campaign structure, everything is optimized from Day 1 for success.",
  },
  {
    title: "Daily Optimization & A/B Testing",
    description:
      "I track campaign performance, test different ad sets, and continuously optimize for better results.",
  },
  {
    title: "Reporting & Communication",
    description:
      "You’ll receive clear reports and ongoing support, ensuring that you’re always in the loop.",
  },
];

const WorkingProcessSection = () => {
  return (
    <section className="bg-black pt-12 px-4 pb-16 text-white relative">
      <div className="xl:container xl:mx-auto max-w-6xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#EF6C00]">
          My Working Process
        </h2>
        <p className="text-lg text-gray-300 mb-12">
          A clear, proven system that turns ad spend into real sales.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center">
              {/* Step Box */}
              <div className="bg-white text-black p-6 rounded-lg shadow-md w-full h-full">
                <h3 className="text-lg font-semibold mb-2">
                  Step {index + 1}: {step.title}
                </h3>
                <p className="text-gray-700">{step.description}</p>
              </div>

              {/* Right Arrow (Desktop) */}
              {index < steps.length - 1 && (index + 1) % 3 !== 0 && (
                <div className="hidden md:block absolute right-[-25px] top-1/2 transform -translate-y-1/2 animate-bounce transition-all duration-300">
                  <FaArrowRight className="text-[#EF6C00] text-xl" />
                </div>
              )}

              {/* Down Arrow (Mobile) */}
              {index < steps.length - 1 && (
                <div className="block md:hidden mt-4 animate-bounce transition-all duration-300">
                  <FaArrowDown className="text-[#EF6C00] text-xl" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkingProcessSection;
