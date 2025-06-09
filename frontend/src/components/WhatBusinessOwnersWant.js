import React from "react";
import { getHowIWork } from "@/utils/getPageContentData";

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

const WhatBusinessOwnersWant = async () => {
  const services = await getHowIWork();

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
