import React from "react";
import * as FaIcons from "react-icons/fa"; // import icon set
import { getServices } from "@/utils/getPageContentData";

const Services = async () => {
  const services = await getServices();

  return (
    <div className="bg-[#1C2124] text-white px-4 pt-35 md:pt-30 pb-10 pt">
      <div className="xl:container xl:mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold text-[#EF6C00] mb-10">
          I Can Help You With:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => {
            const Icon = FaIcons[service.iconName]; // dynamic icon

            return (
              <div key={index} className="p-6 bg-black rounded-xl">
                <div className="flex justify-center mb-4">
                  {Icon && <Icon className="text-4xl text-[#EF6C00]" />}
                </div>
                <h3 className="text-2xl font-semibold text-[#EF6C00]">
                  {service.title}
                </h3>
                <p className="text-lg mt-2">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
