import React from "react";
import {
  FaBullhorn,
  FaChartLine,
  FaPaintBrush,
  FaWrench,
  FaLaptopCode,
  FaSass,
} from "react-icons/fa";
import { Check } from "lucide-react";

const sections = [
  {
    icon: <FaBullhorn className="text-[50px] text-blue-500 mb-3" />,
    title: "Ad Platforms",
    items: [
      "Meta Ads Manager (Facebook & Instagram)",
      "Google Ads",
      "TikTok Ads Manager",
      "LinkedIn Ads (Perfect for B2B clients)",
    ],
  },
  {
    icon: <FaChartLine className="text-[50px] text-green-500 mb-3" />,
    title: "Analytics & Tracking",
    items: [
      "Google Analytics 4 (GA4)",
      "Meta Pixel",
      "Google Tag Manager",
      "UTM Links",
    ],
  },
  {
    icon: <FaPaintBrush className="text-[50px] text-pink-500 mb-3" />,
    title: "Creative Tools",
    items: [
      "Canva (quick designs & social content)",
      "CapCut (video editing for ads)",
      "Adobe Photoshop (advanced design work)",
      "ChatGPT (for creative ad copy ideas)",
    ],
  },
  {
    icon: <FaWrench className="text-[50px] text-yellow-500 mb-3" />,
    title: "Optimization & Reporting",
    items: [
      "Google Looker Studio (for interactive dashboards)",
      "Meta Ads Reporting",
      "A/B Testing Tools (like Meta’s built-in testing features)",
      "Google Sheets / Excel (manual tracking, custom reports)",
    ],
  },
  {
    icon: <FaLaptopCode className="text-[50px] text-blue-500 mb-3" />,
    title: "Website & Landing Page Builders",
    items: [
      "WordPress / Webflow / Shopify – For building websites",
      "ClickFunnels / Systeme.io / LeadPages – For high-converting funnels\n",
      "Shopify – For eCommerce stores",
    ],
  },
  {
    icon: <FaSass className="text-[50px] text-blue-500 mb-3" />,
    title: "Market Research & Planning",
    items: [
      "Google Trends – To explore trending topics and keywords\n",
      "AnswerThePublic – For finding customer questions and content ideas\n",
      "SimilarWeb – To analyze competitors’ traffic sources",
    
    ],
  },
];

const ToolsSection = () => {
  return (
    <section className="bg-[#1C2124] p-4 pt-10 pb-10">
      <div className="xl:container xl:mx-auto">
        <div className={"text-center"}>
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#EF6C00]">
            Tools I Use:
          </h2>
          <p className="text-lg text-gray-300 mb-12">
            The platforms and tools that power every successful campaign.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 shadow hover:shadow-md transition"
            >
              <div className="flex flex-col items-center justify-center">
                {section.icon}
                <h3 className="text-xl text-black font-semibold mb-3">{section.title}</h3>
                <ul className=" space-y-2 text-gray-700 ">
                  {section.items.map((item, i) => (
                    <li key={i} className={"flex  gap-2"}>
                      <Check className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
