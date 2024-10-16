import React from "react";
import { Link } from "react-router-dom";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import {
  FaGlobe,
  FaApple,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div className="w-full bg-black font-semibold">
      <div className="w-full px-[5%] sm:px-[10%] py-5 flex items-center justify-around gap-5 flex-wrap text-white">
        <Link to={"/"} className="mr-7">
          <img src="/NS_logo.jpg" className="w-16 h-auto" alt="" />
        </Link>

        <div className="w-fit py-5 flex sm:items-center items-start content-start justify-start sm:justify-around gap-5 md:gap-10 flex-wrap sm:flex-nowrap text-white">
          <div className="min-w-[300px] sm:min-w-0 sm:shrink-0 flex flex-col gap-2 items-start justify-start p-2">
            <h1 className="font-bold text-xl text-[#d62929]">Quick Links</h1>
            <Link to={"/"} className="hover:text-[#d62929] transition-all ease-linear"> Home</Link>
            <Link to={"/blog"} className="hover:text-[#d62929] transition-all ease-linear"> Blog</Link>
            <Link to={"/news"} className="hover:text-[#d62929] transition-all ease-linear">News</Link>
          </div>
          <div className="min-w-[300px] sm:min-w-0 sm:shrink-0 flex flex-col gap-2 items-start justify-start p-2">
            <h1 className="font-bold text-xl text-[#d62929]">Mobile App and Links</h1>
            <a href="#" className="flex gap-2 hover:text-[#d62929] transition-all ease-linear">
              <HiMiniDevicePhoneMobile className="w-4 h-auto" /> Mobile App
            </a>
            <a href="#" className="flex gap-2 hover:text-[#d62929] transition-all ease-linear">
              <FaGlobe className="w-4 h-auto" /> Website
            </a>
            <a href="#" className="flex gap-2 hover:text-[#d62929] transition-all ease-linear">
              <FaApple className="w-4 h-auto" /> IOS
            </a>
          </div>
          <div className="min-w-[300px] sm:min-w-0 sm:shrink-0 flex flex-col gap-2 items-start justify-start p-2">
            <h1 className="font-bold text-xl text-[#d62929]">Follow On</h1>
            <a href="#" className="flex gap-2 hover:text-[#d62929] transition-all ease-linear">
              <FaFacebook className="w-4 h-auto" /> FaceBook
            </a>
            <a href="#" className="flex gap-2 hover:text-[#d62929] transition-all ease-linear">
              <FaInstagram className="w-4 h-auto" /> Instagram
            </a>
            <a href="#" className="flex gap-2 hover:text-[#d62929] transition-all ease-linear">
              <FaYoutube className="w-4 h-auto" /> YouTube
            </a>
          </div>
        </div>
      </div>

      <div className="w-full p-2 flex items-center  justify-center">
        <p className="text-center text-gray-400">
          © {new Date().getFullYear()} nssports.com
        </p>
      </div>
    </div>
  );
}
