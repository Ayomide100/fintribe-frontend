import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../assets/fintribelogo.png";
import { ChevronDown, LogOut, Search, Settings, User } from "lucide-react";
import { IoMdNotificationsOutline } from "react-icons/io";
import userprofilepic from "../../../assets/notfiyimg.png";

const DashboardHeader = () => {
  const [dropdown, setDropdown] = useState(false);

  const HandleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className="w-full h-full flex shadow-md justify-between items-center px-6">
      <div className="w-[10%]">
        <Image src={logo} alt="logo" />
      </div>
      <div className="w-[40%] h-[70%] bg-[#f1f1f1] rounded-md gap-2 flex justify-center items-center">
        <Search className="text-[#6E6E6E]" />
        <input
          type="text"
          placeholder="Search Guru, Deals, Circles"
          className=" w-[90%] h-full text-sm  outline-none focus:outline-none bg-transparent"
        />
      </div>
      <div className="w-[10%] h-[90%]  flex justify-around items-center">
        <IoMdNotificationsOutline size={25} />
        <div
          onClick={() => HandleDropdown()}
          className="w-[70%] h-full transition-all duration-300  hover:bg-[#84C2A27A] cursor-pointer rounded-md gap-2 flex justify-center items-center"
        >
          <div className="w-[40px] h-[40px]  rounded-full flex justify-center items-center">
            <Image src={userprofilepic} alt="notification" />
          </div>
          <ChevronDown onClick={() => HandleDropdown()} />
        </div>

        <div
          className={`absolute right-9 top-12 w-[200px]  bg-[#ffffff] shadow-md rounded-md ${
            dropdown ? "block" : "hidden"
          }`}
        >
          <ul>
            <li className="px-4 py-2 hover:bg-[#2E8B57] text-sm   hover:text-white duration-300 transition-all cursor-pointer rounded-md  flex justify-start gap-2 items-center">
              {" "}
              <User /> Profile
            </li>
            <li className="px-4 py-2 hover:bg-[#2E8B57] text-sm  hover:text-white duration-300 transition-all cursor-pointer rounded-md  flex justify-start gap-2 items-center">
              <Settings /> Settings
            </li>
            <li className="px-4 py-2 hover:bg-[#2E8B57] text-red-500 text-sm  hover:text-white duration-300 transition-all cursor-pointer rounded-md  flex justify-start gap-2 items-center">
              <LogOut /> Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
