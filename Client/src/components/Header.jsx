import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

export default function Header() {
  const [navState, setNavState] = useState(false);
  const location=useLocation

  return (
    <div className="z-10 w-full px-[5%] sm:px-[10%] py-2 flex items-center justify-between bg-black text-white">
      <Link to="/">
        <img src="/NS_logo.jpg" className="w-16 h-auto" alt="" />
      </Link>
      <nav className="font-semibold flex gap-7 items-center justify-center hidden sm:flex">
        <Link to="/" className="hover:text-[#d62929] transition-all ease-linear">Home</Link>
        <Link to="/blog" className="hover:text-[#d62929] transition-all ease-linear">Blog</Link>
        <Link to="/news" className="hover:text-[#d62929] transition-all ease-linear">News</Link>
        <Link to="/contact" className="hover:text-[#d62929] transition-all ease-linear">Contact us</Link>
      </nav>

      <LuMenu
        className="w-7 mt-1 h-auto cursor-pointer sm:hidden"
        onClick={() => {
          setNavState(true);
        }}
      />

      <div
        className={`z-10 sidebar sm:hidden w-[70vw] p-7 flex flex-col gap-4 items-start justify-start font-semibold text-black bg-[#d62929] fixed top-0 ${
          navState ? "right-0" : "right-[-150%]"
        } min-h-screen shadow-lg shadow-black`}
      >
        <IoClose
          className="w-6 h-auto"
          onClick={() => {
            setNavState(false);
          }}
        />
        <Link to="/" className="hover:text-[#d62929] transition-all ease-linear" onClick={() => {
            setNavState(false);
          }}>Home</Link>
        <Link to="/blog" className="hover:text-[#d62929] transition-all ease-linear" onClick={() => {
            setNavState(false);
          }}>Blog</Link>
        <Link to="/news" className="hover:text-[#d62929] transition-all ease-linear" onClick={() => {
            setNavState(false);
          }}>News</Link>
        <Link to="/contact" className="hover:text-[#d62929] transition-all ease-linear" onClick={() => {
            setNavState(false);
          }}>Contact us</Link>
      </div>
    </div>
  );
}
