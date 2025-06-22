"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ImageComponent from "@/components/ImageComponent";
const apiURL = process.env.NEXT_PUBLIC_API_URL;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);


  useEffect(() => {
    fetch(`${apiURL}/getalltestimonial`)
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
      })
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  return (
    <div className="bg-[#1C2124] p-4 pt-10 pb-10 scroll-mt-20">
      <div className="xl:container xl:mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold text-[#EF6C00] mb-10">
          What Clients Say:
        </h2>

        {testimonials.length > 0 && (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={30}
            slidesPerView={3}
            breakpoints={{
              340: { slidesPerView: 1 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={item._id || index}>
                <div className="flex justify-center">
                  <ImageComponent
                    imageName={item.imgSrc}
                    alt={`Client ${index + 1}`}
                    height={400}
                    width={400}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
