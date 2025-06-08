import React from "react";

const ServiceCard = ({ title, whatTheyWant, whatIDeliver }) => {
  return (
    <div className="flex flex-col  p-6 bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all  justify-center">
      <div className="mb-4 flex items-center justify-center flex-col">
        <h3 className="text-2xl text-[#EF6C00] font-semibold">{title}</h3>
      </div>
      <div className="mb-2 flex items-center justify-center flex-col">
        <h4 className="font-semibold text-[#EF6C00]">What They Want:</h4>
        <p className={"text-center"}>{whatTheyWant}</p>
      </div>
      <div className="mt-2 flex items-center justify-center flex-col">
        <h4 className="font-semibold text-[#EF6C00]">What I Deliver:</h4>
        <p className={"text-center"}>{whatIDeliver}</p>
      </div>
    </div>
  );
};

const WhatBusinessOwnersWant = () => {
  const services = [
    {
      title: "Clear ROI",
      whatTheyWant: "Measurable results that impact the bottom line.",
      whatIDeliver:
        "Campaigns focused on conversions, not just clicks. Full-funnel strategy (TOFU–MOFU–BOFU) aligned with business goals. Real-time tracking of leads, sales, and ROI.",
    },
    {
      title: "Time-Efficient Execution",
      whatTheyWant: "Less stress, more done — fast.",
      whatIDeliver:
        "End-to-end campaign setup and management. Fast turnaround with clear timelines. No micro-managing needed — just results.",
    },
    {
      title: "Transparent Reporting",
      whatTheyWant: "Clarity, accountability, and insights.",
      whatIDeliver:
        "Easy-to-read performance reports. Weekly or monthly updates with key metrics. Actionable insights for ongoing improvements.",
    },
    {
      title: "Scalable Growth Systems",
      whatTheyWant: "Campaigns that grow with their business.",
      whatIDeliver:
        "Advanced audience segmentation and retargeting. High-converting landing pages and ad copy. Long-term strategies designed for profitable scaling.",
    },
    {
      title: "Reliable Communication",
      whatTheyWant: "A responsive, trustworthy partner.",
      whatIDeliver:
        "Regular check-ins via email, WhatsApp, or Zoom. Dedicated support at every stage. Fast response to questions or change requests.",
    },
    {
      title: "Creative + Copy That Sells",
      whatTheyWant: "Ads that stop the scroll *and* drive action.",
      whatIDeliver:
        "Eye-catching, platform-optimized visuals. Persuasive, conversion-driven ad copy. Consistent brand messaging across campaigns.",
    },
    {
      title: "Continuous Optimization",
      whatTheyWant: "Performance that improves over time.",
      whatIDeliver:
        "A/B testing for creatives, audiences, and placements. Weekly performance reviews and data-driven changes. A 'never set it and forget it' approach.",
    },
    {
      title: "Stress-Free Workflow",
      whatTheyWant: "A smooth, professional experience from start to finish.",
      whatIDeliver:
        "Proven processes. Clear communication. Reliable, high-performing marketing — without the chaos.",
    },
  ];

  return (
    <section className="bg-black py-12 px-6 text-gray-100">
      <div className={"xl:container xl:mx-auto"}>
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#EF6C00]">
            What Business Owners Want — And How I Deliver
          </h2>
          <p className="text-lg text-gray-400">
            As a performance marketer, I understand what matters most to
            business owners. Below is a breakdown of what clients typically look
            for — and how I meet those expectations.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatBusinessOwnersWant;
