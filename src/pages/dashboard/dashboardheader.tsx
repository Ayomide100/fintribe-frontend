import Image from "next/image";
import React from "react";
import logo from "../../../assets/fintribelogo.png";
import { ChevronDown, Search } from "lucide-react";
import { IoMdNotificationsOutline } from "react-icons/io";
import userprofilepic from "../../../assets/notfiyimg.png";

const DashboardHeader = () => {
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
      <div className="w-[13%] h-[90%]  flex justify-around items-center">
        <IoMdNotificationsOutline size={25} />
        <div className="w-[40px] h-[40px]  rounded-full flex justify-center items-center">
          <Image src={userprofilepic} alt="notification" />
        </div>
        <ChevronDown />
      </div>
    </div>
  );
};

export default DashboardHeader;
