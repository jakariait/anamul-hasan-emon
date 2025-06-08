"use client";

import React, { useState } from "react";
import {getWhatsApp} from "@/utils/brand";

const plans = {
  monthly: [
    {
      title: "Basic Plan",
      price: "$300/month",
      highlights: [
        "Up to 3 Campaigns (Meta or Google)",
        "Pixel & Conversion Setup",
        "Monthly Strategy Call",
        "Weekly Report",
        "Audience Research & Setup",
        "Creative Guidance",
      ],
    },
    {
      title: "Growth Plan",
      price: "$500/month",
      isHighlighted: true,
      highlights: [
        "Up to 6 Campaigns (Meta & Google)",
        "Full Funnel Setup (TOFU–BOFU)",
        "A/B Testing",
        "Bi-weekly Strategy Calls",
        "Advanced Analytics & Reporting",
        "Retargeting & Lookalike Strategy",
        "Creative Direction + Copywriting Support",
      ],
    },
    {
      title: "Scale Plan",
      price: "$800/month",
      highlights: [
        "Up to 10 Ad Campaigns (Meta, Google, TikTok)",
        "Conversion Funnel Strategy",
        "Advanced Audience Layers & Split Testing",
        "Dynamic Creative Strategy",
        "Weekly Optimization & Scaling",
        "Unlimited Messaging Support (via email/Slack)",
        "4x Monthly Strategy Calls",
        "Comprehensive Monthly Report with Insights",
      ],
    },
  ],
  project: [
    {
      title: "Starter",
      price: "$200",
      highlights: [
        "2 Meta Ads (FB + IG)",
        "Audience Research",
        "Pixel Setup",
        "Copywriting + Creatives",
        "Campaign Setup",
        "⏱️ 3-day Delivery",
        "10 Day Management",
      ],
    },
    {
      title: "Standard",
      price: "$300",
      highlights: [
        "4 Meta Ads (FB + IG)",
        "Retargeting + Pixel Setup",
        "Advanced Audience Segmentation",
        "Creatives + Copy",
        "Optimization Support",
        "⏱️ 5-day Delivery",
        "15 Day Management",
      ],
    },
    {
      title: "Premium",
      price: "$500",
      isHighlighted: true,
      highlights: [
        "8 Meta Ads (FB + IG)",
        "Full Funnel Strategy (TOFU–BOFU)",
        "A/B Testing",
        "Retargeting + Custom Audiences",
        "1x Zoom Strategy Call",
        "Deep Analytics & Reporting",
        "⏱️ 10-day Delivery",
        "30 Day Management",
      ],
    },
  ],
};

const PricingCard = ({
  title,
  price,
  highlights,
  isHighlighted = false,
  emoji,
}) => (
  <section
    id={"pricing"}
    className={`scroll-mt-96 flex flex-col justify-between p-6 rounded-xl border shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer ${
      isHighlighted
        ? "bg-blue-950 border-blue-600 text-white"
        : "bg-gray-800 border-gray-700 text-gray-200"
    }`}
  >
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-xl text-[#EF6C00] font-bold">
          {emoji ? `${emoji} ${title}` : title}
        </h3>
        <p className="text-2xl font-semibold text-[#EF6C00]">{price}</p>
      </div>
      <ul className="space-y-2 text-sm w-full mt-4">
        {highlights.map((point, i) => (
          <li key={i} className="flex items-start">
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <a
        href={getWhatsApp()}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="px-6 py-1 bg-[#EF6C00] text-white font-semibold rounded-md transition cursor-pointer">
          Contact Me
        </button>
      </a>
    </div>
  </section>
);

const PricingSection = () => {
  const [activePlanType, setActivePlanType] = useState("monthly");

  return (
    <section className="bg-gray-900 text-gray-100 p-4">
      <div className="xl:container xl:mx-auto flex flex-col items-center justify-center">
        <div className=" mx-auto text-center mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#EF6C00]">
            Pricing Plans:
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            You can hire me monthly for ongoing support or per project for
            specific campaigns. Choose what works best for your business.
          </p>
        </div>

        {/* Plan Type Switcher */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            className={`px-5 py-2 rounded-full cursor-pointer text-sm font-medium transition ${
              activePlanType === "monthly"
                ? "bg-[#EF6C00] text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActivePlanType("monthly")}
          >
            Monthly Retainer
          </button>
          <button
            className={`px-5 py-2 rounded-full cursor-pointer text-sm font-medium transition ${
              activePlanType === "project"
                ? "bg-[#EF6C00] text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActivePlanType("project")}
          >
            Project-Based
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 w-full md:grid-cols-3 ">
          {plans[activePlanType].map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>

        {/* Custom Offer CTA */}
        <div className="text-center mt-16">
          <h4 className="text-xl font-semibold mb-2">Need a Custom Offer?</h4>
          <p className="text-gray-400 mb-4">
            Every business is different. Let&apos;s build a custom plan that fits
            your exact goals.
          </p>
          <a
            href={getWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#EF6C00] text-white px-6 py-3 rounded-md font-bold transition"
          >
            👉 Get a Custom Pricing
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
