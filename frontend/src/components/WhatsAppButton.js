"use client";

import { FaWhatsapp } from "react-icons/fa";
import {getWhatsApp} from "@/utils/brand";

const WhatsAppButton = () => {
  const message = "Hello! I'm interested in your services."; // Optional

  const handleClick = () => {
    const encodedMsg = encodeURIComponent(message);
    window.open(`${getWhatsApp()}?text=${encodedMsg}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-24 right-2  text-[#28D366] p-3  z-50  cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="w-12 h-12" />
    </button>
  );
};

export default WhatsAppButton;
