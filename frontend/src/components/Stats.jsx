"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function Stats() {
  const stats = [
    { label: "Happy Clients", value: 50 },
    { label: "Project Completed", value: 600 },
    { label: "Years Experience", value: 3.5 },
    { label: "Ad Spend", value: 4.3, suffix: "M" },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true, // only trigger once
    threshold: 0.3,     // percentage of component visible before triggering
  });

  return (
    <div
      ref={ref}
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#09122C] z-10 w-full xl:container xl:mx-auto md:rounded-xl shadow"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 py-10 gap-4 px-4">
        {stats.map((stat, index) => {
          const isLast = index === stats.length - 1;
          const isSecondInSmall = index === 1;
          const borderClass =
            !isLast && !isSecondInSmall
              ? "border-r-2 border-gray-700 md:pr-10"
              : isSecondInSmall
                ? "md:border-r-2 md:border-gray-700 md:pr-10"
                : "";

          return (
            <div key={index} className="text-center">
              <div
                className={`flex flex-col items-center gap-2 ${borderClass}`}
              >
                <p className="text-3xl md:text-4xl font-bold text-[#EF6C00]">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2}
                      decimals={stat.value % 1 !== 0 ? 1 : 0}
                    />
                  ) : (
                    0
                  )}
                  {stat.suffix || ""}+
                </p>
                <p className="md:text-lg text-gray-300">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
