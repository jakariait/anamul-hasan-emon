import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" bg-gray-900 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center gap-2">
        <p className="text-sm">
          © {currentYear} All rights reserved.
        </p>
        <p className="text-sm">
          Designed & Developed by{" "}
          <a
            href="https://buildwithjakaria.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 font-semibold hover:underline"
          >
            Jakaria
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
