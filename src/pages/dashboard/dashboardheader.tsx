import Image from "next/image";
import React from "react";
import logo from "../../../assets/fintribelogo.png";
import { Search } from "lucide-react";

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
      <div className="w-[16%] h-[90%] bg-emerald-400"></div>
    </div>
  );
};

export default DashboardHeader;
