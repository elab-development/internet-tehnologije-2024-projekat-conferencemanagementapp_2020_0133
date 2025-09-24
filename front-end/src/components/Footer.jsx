import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
  FaPinterestP,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";

function Footer() {
  const navigate = useNavigate();

  // Helper za scroll to top i navigaciju
  const handleNav = (to) => {
    navigate(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#06142e] text-white pt-10 pb-4 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10 pb-8">
        {/* Left: Logo (text), contact, social */}
        <div className="flex-1 min-w-[220px] flex flex-col gap-4">
          <div className="text-3xl font-extrabold tracking-widest text-blue-400 mb-2">
            CONFE
          </div>
          <div className="flex items-center gap-2 text-cyan-400">
            <FaEnvelope />
            <span>info@internationalconferencealerts.com</span>
          </div>
          <div className="flex items-center gap-2 text-cyan-400">
            <FaPhoneAlt />
            <span>+91-8925031783</span>
          </div>
          <div className="mt-4 font-bold text-cyan-400">FOLLOW US</div>
          <div className="flex gap-3 mt-2">
            <button className="bg-[#0e224d] hover:bg-cyan-400 hover:text-[#0e224d] transition-colors p-2 rounded-full">
              <FaFacebookF />
            </button>
            <button className="bg-[#0e224d] hover:bg-cyan-400 hover:text-[#0e224d] transition-colors p-2 rounded-full">
              <FaTwitter />
            </button>
            <button className="bg-[#0e224d] hover:bg-cyan-400 hover:text-[#0e224d] transition-colors p-2 rounded-full">
              <FaInstagram />
            </button>
            <button className="bg-[#0e224d] hover:bg-cyan-400 hover:text-[#0e224d] transition-colors p-2 rounded-full">
              <FaLinkedinIn />
            </button>
            <button className="bg-[#0e224d] hover:bg-cyan-400 hover:text-[#0e224d] transition-colors p-2 rounded-full">
              <FaTelegramPlane />
            </button>
            <button className="bg-[#0e224d] hover:bg-cyan-400 hover:text-[#0e224d] transition-colors p-2 rounded-full">
              <FaPinterestP />
            </button>
          </div>
        </div>
        
        <div className="flex-1 min-w-[220px]">
          <div className="font-bold text-cyan-400 mb-4">QUICK LINKS</div>
          <ul className="flex flex-col gap-2">
            <li>
              <button
                onClick={() => handleNav("/conferences")}
                className="hover:underline text-white text-left w-full"
              >
                Conferences
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav("/about-us")}
                className="hover:underline text-white text-left w-full"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav("/contact")}
                className="hover:underline text-white text-left w-full"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* Full-width line */}
      <div className="w-full border-t border-[#0e224d] my-2"></div>
      {/* Copyright centered */}
      <div className="max-w-6xl mx-auto flex justify-center items-center pt-2 text-sm text-cyan-100">
        <span className="text-center w-full">
          Copyrights © 2025. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
