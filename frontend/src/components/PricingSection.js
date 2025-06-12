"use client";

import React, { useEffect, useState } from "react";
import { getWhatsApp } from "@/utils/brand";
import { getPlans } from "@/utils/getPageContentData"; // Adjust path to where getPlans is defined

const PricingCard = ({
  title,
  price,
  highlights,
  isHighlighted = false,
  emoji,
}) => (
  <section id="pricing"
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
      <a href={getWhatsApp()} target="_blank" rel="noopener noreferrer">
        <button className="px-6 py-1 bg-[#EF6C00] text-white font-semibold rounded-md transition cursor-pointer">
          Contact Me
        </button>
      </a>
    </div>
  </section>
);

const PricingSection = () => {
  const [activePlanType, setActivePlanType] = useState("monthly");
  const [plans, setPlans] = useState({ monthly: [], project: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const data = await getPlans();
        setPlans(data);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-900 text-gray-100 p-8 text-center">
        Loading pricing plans...
      </section>
    );
  }

  return (
    <section className="bg-gray-900 text-gray-100 p-4">
      <div className="xl:container xl:mx-auto flex flex-col items-center justify-center">
        <div className="mx-auto text-center mb-12">
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
          {["monthly", "project"].map((type) => (
            <button
              key={type}
              className={`px-5 py-2 rounded-full cursor-pointer text-sm font-medium transition ${
                activePlanType === type
                  ? "bg-[#EF6C00] text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setActivePlanType(type)}
            >
              {type === "monthly" ? "Monthly Retainer" : "Project-Based"}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 w-full md:grid-cols-3">
          {plans[activePlanType]?.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>

        {/* Custom Offer CTA */}
        <div className="text-center mt-16">
          <h4 className="text-xl font-semibold mb-2">Need a Custom Offer?</h4>
          <p className="text-gray-400 mb-4">
            Every business is different. Let&apos;s build a custom plan that
            fits your exact goals.
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
