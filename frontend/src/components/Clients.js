"use client"
import React, {useEffect, useState} from 'react';
import ImageComponent from "@/components/ImageComponent";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const Clients = () => {

  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch(`${apiURL}/getallcarousel`)
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);



  return (
    <div id="testimonial" className="bg-black pt-10 p-4 scroll-mt-20"
         style={{
           backgroundImage: "url('/certificate-bg.png')", // Replace with the path to your background image
           backgroundSize: 'cover',
           backgroundPosition: 'cover',
         }}>
      <div className="xl:container xl:mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold text-[#EF6C00] mb-10">Clients I worked with:</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-10">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex justify-center items-center"
            >
              <ImageComponent
                imageName={brand.imgSrc}
                alt={`Logo ${index + 1}`}
                className="h-44 w-44 rounded-full object-cover"
              />
            </div>
          ))}
        </div>
        <a
          href="https://wa.me/8801307217573"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#EF6C00] px-6 py-4 rounded-xl font-bold text-white inline-flex items-center gap-2"
        >
          Work With Me
        </a>
      </div>
    </div>
  );
};

export default Clients;