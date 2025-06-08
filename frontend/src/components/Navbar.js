"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { getBrandLogo, getBrandName } from "@/utils/brand";

const menuItems = [
  { name: "About Me", path: "/#about" },
  { name: "Testimonial", path: "/#testimonial" },
  { name: "Pricing", path: "/#pricing" },
  { name: "FAQs", path: "/#faqs" },
  { name: "Blog", path: "/blogs" },
  { name: "Contact Us", path: "/#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="bg-green-300  shadow-md px-4 sticky top-0 z-50"
    >
      <div className="xl:container xl:mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <img
            src={getBrandLogo()}
            alt={getBrandName()}
            className={"w-40 -mt-10 -mb-16"}
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-black font-medium">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.path}
                className="hover:text- transition-colors"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden text-white border-2 border-[#EF6C00] flex items-center justify-center ">
          <button
            className="cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen
            ? "max-h-96 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <ul className="mt-4 space-y-4 text-white text-center font-medium bg-[#1C2124] p-4 rounded-md">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.path}
                className="block hover:text-blue-500 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
