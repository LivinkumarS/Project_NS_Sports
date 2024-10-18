import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import { FaRegUserCircle, FaRegNewspaper } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Dropdown } from "flowbite-react";
import { VscLiveShare } from "react-icons/vsc";
import { AiOutlineSchedule, AiOutlineTeam } from "react-icons/ai";
import { TfiCup } from "react-icons/tfi";
import { MdOndemandVideo } from "react-icons/md";
import { LiaBlogSolid } from "react-icons/lia";

export default function Header() {
  const [navState, setNavState] = useState(false);
  const location = useLocation;

  return (
    <div className="sticky top-0 z-10 w-full px-[5%] xl:px-[10%] py-2 flex items-center justify-between bg-[#0077b6] text-white">
      <Link to="/">
        <img src="/NS_logo.png" className="w-16 h-auto" alt="" />
      </Link>
      <nav className="font-semibold gap-4 md:gap-7 items-center justify-center hidden md:flex">
        <Link
          to="/live"
          className="hover:text-[#d62929] transition-all ease-linear text-sm gap-1"
        >
          <div className="flex flex-col items-center justify-end">
            <VscLiveShare className="text-xl" />
            <p>Live Score</p>
          </div>
        </Link>
        <Link
          to="/schedule"
          className="hover:text-[#d62929] transition-all ease-linear text-sm gap-1"
        >
          <div className="flex flex-col items-center justify-end">
            <AiOutlineSchedule className="text-xl" />
            <p>Schedule</p>
          </div>
        </Link>
        <Link
          to="/series"
          className="hover:text-[#d62929] transition-all ease-linear text-sm gap-1"
        >
          <div className="flex flex-col items-center justify-end">
            <TfiCup className="text-xl" />
            <p>Series</p>
          </div>
        </Link>
        <Link
          to="/teams"
          className="hover:text-[#d62929] transition-all ease-linear text-sm gap-1"
        >
          <div className="flex flex-col items-center justify-end">
            <AiOutlineTeam className="text-xl" />
            <p>Teams</p>
          </div>
        </Link>
        <Link
          to="/news"
          className="hover:text-[#d62929] transition-all ease-linear text-sm gap-1"
        >
          <div className="flex flex-col items-center justify-end">
            <FaRegNewspaper className="text-xl" />
            <p>News</p>
          </div>
        </Link>
        <Link
          to="/videos"
          className="hover:text-[#d62929] transition-all ease-linear text-sm gap-1"
        >
          <div className="flex flex-col items-center justify-end">
            <MdOndemandVideo className="text-xl" />
            <p>Videos</p>
          </div>
        </Link>
        <Link
          to="/blogs"
          className="hover:text-[#d62929] transition-all ease-linear text-sm gap-1"
        >
          <div className="flex flex-col items-center justify-end">
            <LiaBlogSolid className="text-xl" />
            <p>Blogs</p>
          </div>
        </Link>
        <div>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div className="mt-[2px] flex flex-col items-center justify-end hover:text-[#d62929] transition-all ease-linear">
                <FaRegUserCircle className="text-xl" />
                <p className="text-sm">Profile</p>
              </div>
            }
          >
            <Dropdown.Header>
              <span className="font-bold text-sm block">User Name</span>
              <span className="text-sm">user@mail.com</span>
            </Dropdown.Header>
            <Dropdown.Item>Signout</Dropdown.Item>
          </Dropdown>
        </div>
      </nav>

      <div className="md:hidden flex gap-4 sm:gap-7 items-center">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <div className="mt-[2px] flex flex-col items-center justify-end hover:text-[#d62929] transition-all ease-linear">
              <FaRegUserCircle className="text-xl" />
              <p className="text-sm">Profile</p>
            </div>
          }
        >
          <Dropdown.Header>
            <span className="font-bold text-sm block">User Name</span>
            <span className="text-sm">user@mail.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Signout</Dropdown.Item>
        </Dropdown>
        <LuMenu
          className="w-7 h-auto cursor-pointer md:hidden"
          onClick={() => {
            setNavState(true);
          }}
        />
      </div>

      <div
        className={`z-10 sidebar md:hidden w-[70vw] p-7 flex flex-col gap-4 items-start justify-start font-semibold text-white bg-[#0077b6] fixed top-0 ${
          navState ? "right-0" : "right-[-150%]"
        } min-h-screen shadow-lg shadow-black`}
      >
        <IoClose
          className="w-6 h-auto"
          onClick={() => {
            setNavState(false);
          }}
        />
        <Link
          onClick={() => {
            setNavState(false);
          }}
          to="/live"
          className="hover:text-[#d62929] transition-all ease-linear text-sm gap-1"
        >
          <div className="flex gap-3 items-center justify-end">
            <VscLiveShare className="text-xl" />
            <p>Live Score</p>
          </div>
        </Link>
        <Link
          onClick={() => {
            setNavState(false);
          }}
          to="/schedule"
          className="hover:text-[#d62929] transition-all ease-linear text-sm gap-1"
        >
          <div className="flex gap-3 items-center justify-end">
            <AiOutlineSchedule className="text-xl" />
            <p>Schedule</p>
          </div>
        </Link>
        <Link
          onClick={() => {
            setNavState(false);
          }}
          to="/series"
          className="hover:text-[#d62929] transition-all ease-linear text-sm gap-1"
        >
          <div className="flex gap-3 items-center justify-end">
            <TfiCup className="text-xl" />
            <p>Series</p>
          </div>
        </Link>
        <Link
          onClick={() => {
            setNavState(false);
          }}
          to="/teams"
          className="hover:text-[#d62929] transition-all ease-linear text-sm gap-1"
        >
          <div className="flex gap-3 items-center justify-end">
            <AiOutlineTeam className="text-xl" />
            <p>Teams</p>
          </div>
        </Link>
        <Link
          onClick={() => {
            setNavState(false);
          }}
          to="/news"
          className="hover:text-[#d62929] transition-all ease-linear text-sm gap-1"
        >
          <div className="flex gap-3 items-center justify-end">
            <FaRegNewspaper className="text-xl" />
            <p>News</p>
          </div>
        </Link>
        <Link
          onClick={() => {
            setNavState(false);
          }}
          to="/videos"
          className="hover:text-[#d62929] transition-all ease-linear text-sm gap-1"
        >
          <div className="flex gap-3 items-center justify-end">
            <MdOndemandVideo className="text-xl" />
            <p>Videos</p>
          </div>
        </Link>
        <Link
          onClick={() => {
            setNavState(false);
          }}
          to="/blogs"
          className="hover:text-[#d62929] transition-all ease-linear text-sm gap-1"
        >
          <div className="flex gap-3 items-center justify-end">
            <LiaBlogSolid className="text-xl" />
            <p>Blogs</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
