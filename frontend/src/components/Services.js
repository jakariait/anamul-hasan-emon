
import React from 'react';
import { Facebook, Target, BarChart, Edit3, Smartphone, Layout } from 'lucide-react';

const services = [
  {
    icon: <Facebook size={48} className={"text-blue-500"}/>,
    title: "Meta Ads",
    description: "Launch and scale ad campaigns that bring in paying customers — not just likes.",
  },
  {
    icon: <Target size={48} className={"text-[#EF6C00]"} />,
    title: "Audience Strategy",
    description: "Reach the right people with the right message, at the right time.",
  },
  {
    icon: <BarChart size={48} className={"text-red-500"}/>,
    title: "Sales Funnel Creation (TOFU–BOFU)",
    description: "Build a conversion journey from awareness to purchase — and beyond.",
  },
  {
    icon: <Edit3 size={48} className={"text-pink-300"}/>,
    title: "Creative & Copy Strategy",
    description: "Scroll-stopping visuals + compelling copy that actually sells.",
  },
  {
    icon: <Smartphone size={48} className={"text-teal-500"} />,
    title: "Analytics & Optimization",
    description: "I track the numbers that matter. Then I improve them.",
  },
  {
    icon: <Layout size={48} />,
    title: "Landing Page Consulting",
    description: "Your ads are only as good as where they land. I guide or optimize your landing pages to increase conversions and reduce drop-offs.",
  },
];

const Services = () => {
  return (
    <div className="bg-[#1C2124] text-white px-4 pt-35 md:pt-30 pb-10 pt">
      <div className="xl:container xl:mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold text-[#EF6C00] mb-10">I Can Help You With:</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div key={index} className="p-6 bg-black rounded-xl">
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-[#EF6C00]">{service.title}</h3>
              <p className="text-lg mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
