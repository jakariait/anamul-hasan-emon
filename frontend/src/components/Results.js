"use client";

import React, { useEffect, useState } from "react";
import ProductGallery from "@/components/ProductGallery";
const apiURL = process.env.NEXT_PUBLIC_API_URL;

const Results = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${apiURL}/getallresults`)
      .then((res) => res.json())
      .then((data) => {
        // Convert API data to image path array
        const formatted = data.map((item) => `/${item.imgSrc}`);
        setImages(formatted);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <div className="md:flex justify-center hidden bg-[#09122C]">
        <ProductGallery images={images} />
      </div>
      <div className="md:hidden bg-[#09122C]">
        <ProductGallery images={images} />
      </div>
    </div>
  );
};

export default Results;
