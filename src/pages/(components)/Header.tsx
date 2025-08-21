import React from "react";
import logo from "../../../assets/fintribelogo.png";
import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full h-[10vh] bg-[#CFE7DB] flex justify-between items-center ">
      <div className="w-[13%] h-full  flex justify-center  items-center">
        <Image
          src={logo}
          alt="FinTribe Logo"
          className=" w-24 h-24 object-contain"
        />
      </div>
      <div className="w-[24%] h-full  flex justify-center gap-5 items-center">
        <button
          className="py-1 px-6 border text-[#2E8B57] hover:text-white hover:bg-[#2E8B57] duration-300 transition-all
         rounded-md border-[#2E8B57] "
        >
          Login
        </button>
        <button className="py-2 px-6 bg-[#0A2540]  hover:bg-[#0e3358] text-white rounded-md">
          Join FinTribe
        </button>
      </div>
    </div>
  );
};

export default Header;
