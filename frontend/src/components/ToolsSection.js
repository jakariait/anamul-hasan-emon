
import React from "react";
import * as FaIcons from "react-icons/fa";
import { Check } from "lucide-react";
import { getToolsIUse } from "@/utils/getPageContentData";

const ToolsSection = async () => {
  const services = await getToolsIUse();

  return (
    <section className="bg-[#1C2124] p-4 pt-10 pb-10">
      <div className="xl:container xl:mx-auto">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#EF6C00]">
            Tools I Use:
          </h2>
          <p className="text-lg text-gray-300 mb-12">
            The platforms and tools that power every successful campaign.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {services.map((section, index) => {
            const Icon = FaIcons[section.iconName]; // Dynamically pick icon

            return (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 shadow hover:shadow-md transition"
              >
                <div className="flex flex-col items-center justify-center">
                  {Icon && <Icon className="text-4xl text-[#EF6C00] mb-2" />}
                  <h3 className="text-xl text-black font-semibold mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
