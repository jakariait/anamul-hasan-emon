"use client";

import React, { useState, useEffect, useRef } from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsArrowsFullscreen } from "react-icons/bs";
import ImageComponent from "@/components/ImageComponent";

const ProductGallery = ({ images, zoom = true }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnailRefs = useRef([]);
  const plugins = zoom ? [lgThumbnail, lgZoom] : [];

  useEffect(() => {
    if (thumbnailRefs.current[activeIndex]) {
      const container = thumbnailRefs.current[activeIndex]?.parentNode;
      if (container) {
        container.scrollTo({
          left: thumbnailRefs.current[activeIndex].offsetLeft - container.offsetWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  const changeImage = (direction) => {
    setActiveIndex((prevIndex) => {
      if (direction === "next") {
        return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      }
    });
  };

  if (!images || images.length === 0) return <p>No images provided.</p>;

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl md:text-2xl font-bold text-[#EF6C00] mb-10">
        My Recent Work:
      </h2>
      <div className="relative w-full md:p-3">
        <div className="absolute bottom-1 right-1 md:bottom-4 flex md:right-4 z-10 gap-1 justify-center items-center">
          {images.length > 1 && (
            <div className="flex items-center gap-1">
              <div className="bg-white p-2 text-xs text-[#EF6C00]" >
                {activeIndex + 1} / {images.length}
              </div>
              <button
                className="bg-white p-2 text-[#EF6C00] cursor-pointer"
                onClick={() => changeImage("prev")}
                disabled={activeIndex === 0}
              >
                <IoIosArrowBack />
              </button>
              <button
                className="bg-white p-2 text-[#EF6C00] cursor-pointer"
                onClick={() => changeImage("next")}
                disabled={activeIndex === images.length - 1}
              >
                <IoIosArrowForward  />
              </button>
            </div>
          )}
        </div>

        {zoom ? (
          <LightGallery speed={500} plugins={plugins}>
            {images.map((url, index) => (
              <a
                key={index}
                href={url}
                className={activeIndex === index ? "block" : "hidden"}
              >
                <ImageComponent
                  imageName={url}
                  className="w-full h-full md:h-[800px]  object-contain cursor-pointer"
                />
                <button className="absolute md:bottom-4 bottom-1 left-1 p-3 md:left-3 bg-white rounded-full cursor-pointer text-[#EF6C00]">
                  <BsArrowsFullscreen />
                </button>
              </a>
            ))}
          </LightGallery>
        ) : (
          <div>
            <ImageComponent
              imageName={images[activeIndex]}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex items-center gap-2 w-full justify-center">
          <button
            onClick={() => changeImage("prev")}
            className="text-xl text-[#EF6C00] transition-colors duration-150 cursor-pointer"
            disabled={activeIndex === 0}
          >
            <IoIosArrowBack />
          </button>

          <div className="p-2 flex items-center justify-center-safe gap-4 overflow-x-auto w-full md:w-[calc(40rem)] scrollbar-hide">
            <div className="flex gap-4">
              {images.map((url, index) => (
                <div
                  key={index}
                  ref={(el) => (thumbnailRefs.current[index] = el)}
                  className={`cursor-pointer overflow-hidden transition-all duration-200 border-1 shrink-0 md:w-30 md:h-30 w-20 h-20 ${
                    activeIndex === index
                      ? "primaryBorderColor scale-105"
                      : "border-transparent opacity-80"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <ImageComponent
                    imageName={url}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => changeImage("next")}
            className="text-xl text-[#EF6C00] transition-colors duration-150 cursor-pointer"
            disabled={activeIndex === images.length - 1}
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
