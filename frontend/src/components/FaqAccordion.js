"use client";

import React, {useCallback, useEffect, useState} from "react";

const FaqAccordion = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  const fetchFAQs = useCallback(async () => {
    try {
      const res = await fetch(`${apiURL}/faq`);
      const data = await res.json();
      if (data?.data) setFaqs(data.data);
    } catch (err) {
      console.error("FAQ fetch error:", err);
    }
  }, [apiURL]);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);
  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div id="faqs" className="bg-black pt-12 px-4 pb-16 scroll-mt-20">
      <div className="xl:container xl:mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-8 text-center text-[#EF6C00]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 md:w-4xl mx-auto text-gray-100">
          {faqs.map((faq, index) => (
            <div key={faq._id} className="border border-gray-700 rounded-lg">
              <button
                className="w-full text-left px-4 py-3 flex justify-between cursor-pointer items-center focus:outline-none"
                onClick={() => toggle(index)}
              >
                <span className="text-lg md:text-2xl font-medium cursor-pointer">
                  {faq.question}
                </span>
                <span className="cursor-pointer">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden px-4 ${
                  activeIndex === index ? "max-h-screen py-2" : "max-h-0"
                }`}
              >
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqAccordion;
