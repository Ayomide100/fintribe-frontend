import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../assets/fintribelogo.png";
import { ChevronDown, LogOut, Search, Settings, User } from "lucide-react";
import { IoMdNotificationsOutline } from "react-icons/io";
import userprofilepic from "../../../assets/notfiyimg.png";
import { MdMenu } from "react-icons/md";

interface Props {
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
}

const DashboardHeader: React.FC<Props> = ({ setSidebarOpen, sidebarOpen }) => {
  const [dropdown, setDropdown] = useState(false);

  const HandleDropdown = () => setDropdown(!dropdown);

  return (
    <div className="w-full h-full flex shadow-md justify-between items-center px-6 relative">
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center justify-center w-10 h-10 bg-[#2E8B571A] border border-[#2E8B57]/30 rounded-xl cursor-pointer transition"
        >
          <MdMenu size={24} className="text-[#2E8B57]" />
        </button>
      </div>

      {/* Logo - Now visible on both mobile and desktop */}
      <div className="w-[10%] md:w-[10%]">
        <Image src={logo} alt="logo" />
      </div>

      {/* Search Bar - Hidden on mobile, visible on desktop */}
      <div className="w-[40%] h-[70%] bg-[#f1f1f1] rounded-md gap-2 hidden md:flex justify-center items-center">
        <Search className="text-[#6E6E6E]" />
        <input
          type="text"
          placeholder="Search Guru, Deals, Circles"
          className=" w-[90%] h-full text-sm outline-none bg-transparent"
        />
      </div>

      {/* Right Side Icons */}
      <div className="w-[10%] h-[90%] flex justify-around items-center relative">
        <IoMdNotificationsOutline size={25} />
        <div
          onClick={HandleDropdown}
          className="w-[70%] h-full hover:bg-[#84C2A27A] cursor-pointer rounded-md gap-2 flex justify-center items-center"
        >
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <Image src={userprofilepic} alt="notification" />
          </div>
          <ChevronDown />
        </div>

        {/* Dropdown */}
        {dropdown && (
          <div className="absolute right-0 top-12 w-[200px] bg-white shadow-md rounded-md z-50">
            <ul>
              <li className="px-4 py-2 hover:bg-[#2E8B57] text-sm hover:text-white cursor-pointer rounded-md flex gap-2 items-center">
                <User /> Profile
              </li>
              <li className="px-4 py-2 hover:bg-[#2E8B57] text-sm hover:text-white cursor-pointer rounded-md flex gap-2 items-center">
                <Settings /> Settings
              </li>
              <li className="px-4 py-2 hover:bg-[#2E8B57] text-red-500 text-sm hover:text-white cursor-pointer rounded-md flex gap-2 items-center">
                <LogOut /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
