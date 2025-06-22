import {FaLinkedin, FaFacebookF, FaYoutube, FaTiktok, FaInstagram} from "react-icons/fa";
import { getSocialLinks } from "@/utils/getPageContentData";

const SocialLinks = async () => {
  const socialLinks = await getSocialLinks();

  return (
    <div className="flex space-x-4 text-2xl px-4 items-center justify-center">
      {/* LinkedIn Icon */}
      <a
        href={socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#0A66C2]" // LinkedIn brand color
        aria-label="LinkedIn profile"

      >
        <FaLinkedin />
      </a>

      {/* Facebook Icon */}
      <a
        href={socialLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1877F2]" // Facebook brand color
        aria-label="Facbeook profile"

      >
        <FaFacebookF />
      </a>

      {/* YouTube Icon */}
      <a
        href={socialLinks.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#FF0000]" // YouTube brand color
        aria-label="Youtube profile"

      >
        <FaYoutube />
      </a>

      {/* TikTok Icon */}
      <a
        href={socialLinks.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-100" // TikTok brand color
        aria-label="TikTok profile"

      >
        <FaTiktok />
      </a>
      {/* Instagram Icon */}
      <a
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#E4405F]" // Instagram brand color
        aria-label="Instagram profile"

      >
        <FaInstagram />
      </a>

    </div>
  );
};

export default SocialLinks;
