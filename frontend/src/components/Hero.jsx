import React from "react";
import Link from "next/link";
import SocialIcon from "@/components/SocialIcon";
import {getName, getTitle} from "@/utils/brand";

const listItems = [
  "Started my Digital Marketing career in 2019\n" +
    "Focused on performance marketing from the beginning, working across Meta Ads and Google Ads to generate measurable growth for businesses.\n",
  "Worked with diverse sectors like eCommerce, Fashion, Health, Real Estate, and Education\n" +
    "Managed full-funnel ad strategies and helped brands scale profitably with data-backed campaigns and consistent optimization.\n",
  "Completed multiple certifications in Facebook Ads, Google Ads, and Web Analytics\n" +
    "Continuously upskilled through hands-on practice and professional training to stay ahead in a rapidly evolving industry.\n",
  "Moved into a strategic role, managing ad budgets for scaling businesses and established brands\n" +
    "Handled monthly ad spends ranging from a few hundred dollars to high five figures, always optimizing for conversions and ROI.\n",
  "Shifted focus to long-term growth partnerships with brands looking for sustainable and scalable performance\n" +
    "Built systems, not just campaigns — with a deep focus on creative testing, custom audiences, and funnel-based strategies.",
];

const Hero = () => {
  return (
    <div id="about" className="bg-black animated-bg scroll-mt-10 pb-30 ">
      <div className="xl:container xl:mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 items-center justify-center">
        {/* Left Content */}
        <div className="text-white p-4 flex-1 flex flex-col justify-center gap-10">
          <div>
            <h1 className="text-[40px] md:text-[70px] text-[#EF6C00] font-bold">
              {getName()}
            </h1>
            <h2 className="text-[40px] md:text-[50px] text-gray-50 font-bold leading-tight">
              {getTitle()}
            </h2>

            <img
              src="/hero-img.jpeg"
              alt=""
              className={"lg:hidden pt-5 pb-5"}
            />

            <ul className="mt-6 space-y-4 text-gray-300 list-disc pl-6">
              {listItems.map((item, index) => (
                <li key={index} className="text-lg md:text-xl">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={
              "flex flex-col md:flex-row gap-2 items-center  justify-center"
            }
          >
            <a
              href="https://wa.me/8801307217573"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#EF6C00] px-6 py-4 rounded-xl font-bold text-white inline-flex items-center gap-2"
            >
              Contact on WhatsApp
            </a>
            <Link
              href="/ebook"
              className="bg-[#EF6C00] px-6 py-4 rounded-xl font-bold text-white inline-flex items-center gap-2"
            >
              Digital Products
            </Link>
          </div>
          <SocialIcon />
        </div>

        {/* Right Side Background Image starting from bottom */}
        <div className="hidden lg:block">
          <img
            src="/hero-img.jpeg"
            alt=""
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
