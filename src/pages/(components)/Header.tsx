import React from "react";
import logo from "../../../assets/fintribelogo.png";
import Image from "next/image";

const Header = () => {
  return (
    <div
      className="w-full h-[10vh]  fixed z-50 border-b border-gray-300 flex justify-between items-center px-4 md:px-8"
      style={{
        background:
          "linear-gradient(to left, #CFE7DB, #E8EFF7, #FFFFFF, #FEFFFE, #FCFEFD)",
      }}
    >
      {/* Logo */}
      <div className="h-full  flex items-center md:justify-start justify-center w-[40%]  md:w-[20%]">
        <Image
          src={logo}
          alt="FinTribe Logo"
          className=" w-24 h-24 object-contain md:w-24 md:h-24"
        />
      </div>

      <div className="flex  gap-5 items-center">
        <button className="py-1 md:px-6 px-4 border text-[#2E8B57] text-sm hover:text-white hover:bg-[#2E8B57] duration-300 transition-all rounded-md border-[#2E8B57]">
          Login
        </button>
        <button className="py-2 md:px-6 px-2 bg-[#0A2540] hover:bg-[#0e3358] text-sm text-white rounded-md">
          Join FinTribe
        </button>
      </div>
    </div>
  );
};

export default Header;
