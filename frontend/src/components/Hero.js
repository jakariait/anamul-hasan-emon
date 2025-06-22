import React from "react";
import SocialIcon from "@/components/SocialIcon";
import { getWhatsApp } from "@/utils/brand";
import {
  getHeroContent,
  getHeroImage,
  getName,
  getTitle,
} from "@/utils/getPageContentData";
import NextImageComponent from "@/components/NextImageComponent";

const Hero = async () => {
  const listItems = await getHeroContent();
  const name = await getName();
  const title = await getTitle();
  const heroImage = await getHeroImage();

  return (
    <div id="about" className="bg-black animated-bg scroll-mt-10 pb-30 ">
      <div className="xl:container xl:mx-auto ">
        <div className={"p-4"}>
          <h1 className="text-[40px] md:text-[70px] text-[#EF6C00] font-bold">
            {name}
          </h1>
          <h2 className="text-[40px] md:text-[50px] text-gray-50 font-bold leading-tight">
            {title}
          </h2>
        </div>
        <div
          className={
            "grid grid-cols-1 lg:grid-cols-2 gap-4 items-center justify-center"
          }
        >
          <div className="text-white p-4 flex-1 flex flex-col justify-center gap-10">
            <div>
              <div className={"lg:hidden pt-5 pb-5 flex items-center justify-center"}>
                <NextImageComponent
                  imageName={heroImage}
                  altName={name}
                  height={400}
                  width={350}
                />
              </div>

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
                href={getWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#EF6C00] px-6 py-4 rounded-xl font-bold text-white inline-flex items-center gap-2"
              >
                Contact on WhatsApp
              </a>
              <SocialIcon />
            </div>
          </div>
          <div className="hidden lg:block">
            <NextImageComponent
              imageName={heroImage}
              altName={name}
              height={500}
              width={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
