import { FaLinkedin, FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa";
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
      >
        <FaLinkedin />
      </a>

      {/* Facebook Icon */}
      <a
        href={socialLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1877F2]" // Facebook brand color
      >
        <FaFacebookF />
      </a>

      {/* YouTube Icon */}
      <a
        href={socialLinks.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#FF0000]" // YouTube brand color
      >
        <FaYoutube />
      </a>

      {/* TikTok Icon */}
      <a
        href={socialLinks.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-100" // TikTok brand color
      >
        <FaTiktok />
      </a>
    </div>
  );
};

export default SocialLinks;
