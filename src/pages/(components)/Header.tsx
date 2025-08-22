import React, { useState } from "react";
import logo from "../../../assets/fintribelogo.png";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="w-full h-[10vh] fixed z-50 border-b border-gray-300 flex justify-between items-center px-4 md:px-8"
      style={{
        background:
          "linear-gradient(to left, #CFE7DB, #E8EFF7, #FFFFFF, #FEFFFE, #FCFEFD)",
      }}
    >
      {/* Logo */}
      <div className="h-full flex items-center">
        <Image
          src={logo}
          alt="FinTribe Logo"
          className="w-16 h-16 object-contain md:w-24 md:h-24"
        />
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex gap-5 items-center">
        <button className="py-1 px-6 border text-[#2E8B57] hover:text-white hover:bg-[#2E8B57] duration-300 transition-all rounded-md border-[#2E8B57]">
          Login
        </button>
        <button className="py-2 px-6 bg-[#0A2540] hover:bg-[#0e3358] text-white rounded-md">
          Join FinTribe
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setOpen(!open)}>
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[10vh] left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden">
          <button className="py-2 px-6 w-[90%] border text-[#2E8B57] hover:text-white hover:bg-[#2E8B57] rounded-md border-[#2E8B57]">
            Login
          </button>
          <button className="py-2 px-6 w-[90%] bg-[#0A2540] hover:bg-[#0e3358] text-white rounded-md">
            Join FinTribe
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
