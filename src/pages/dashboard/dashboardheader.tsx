import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../assets/fintribelogo.png";
import { ChevronDown, LogOut, Search, Settings, User } from "lucide-react";
import { IoMdNotificationsOutline } from "react-icons/io";
import userprofilepic from "../../../assets/notfiyimg.png";
import { MdMenu } from "react-icons/md";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearGuru } from "@/Global/GuruSlice";
import { clearUser } from "@/Global/UserSlice";
import { clearPartner } from "@/Global/PartnerSlice";
import Createlogoutmodal from "@/Modals/createlogoutmodal";

interface Props {
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
}

const DashboardHeader: React.FC<Props> = ({ setSidebarOpen, sidebarOpen }) => {
  const [dropdown, setDropdown] = useState(false);

  const HandleDropdown = () => setDropdown(!dropdown);
  const [OpenModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearGuru());
    dispatch(clearUser());
    dispatch(clearPartner());
    localStorage.clear();
    router.push("/auth/login");
  };

  return (
    <div className="w-full h-full flex shadow-md justify-between items-center md:px-6 px-3 relative">
      {/* Logo - Now visible on both mobile and desktop */}
      <div className="w-[25%] md:w-[10%]">
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

      <div className="w-[50%] h-[70%] rounded-md bg-[#84C2A229] text-[#E0E0E0] md:hidden flex justify-around items-center">
        <Search className="text-[#6E6E6E]" size={20} />
        |
        <IoMdNotificationsOutline
          size={20}
          className="text-[#6E6E6E]"
          onClick={() => router.push("/dashboard/notifications")}
        />
        |{/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center justify-center w-8 h-8 bg-[#2E8B571A] border border-[#2E8B57]/30 rounded-xl cursor-pointer transition"
          >
            <MdMenu size={20} className="text-[#2E8B57]" />
          </button>
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="w-[10%] h-[90%]  md:flex hidden  justify-around items-center relative">
        <div className="w-[30%] h-[70%] hover:bg-[#84C2A27A] cursor-pointer flex justify-center items-center rounded-md">
          <IoMdNotificationsOutline
            size={25}
            onClick={() => router.push("/dashboard/notifications")}
          />
        </div>

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
          <div className="absolute right-0 top-12 w-[170px] h-[150px] flex flex-col justify-center border-[#E0E0E0] border items-start bg-white shadow-md rounded-md z-50">
            <ul className="space-y-2">
              <li>
                <button className="w-full px-11 py-2 hover:bg-[#2E8B57] text-sm hover:text-white cursor-pointer rounded-md flex items-center justify-start gap-2">
                  <User className="w-4 h-4" /> Profile
                </button>
              </li>
              <li>
                <button className="w-full px-11 py-2 hover:bg-[#2E8B57] text-sm hover:text-white cursor-pointer rounded-md flex items-center justify-start gap-2">
                  <Settings className="w-4 h-4" /> Settings
                </button>
              </li>
              <li>
                <button
                  onClick={() => setOpenModal(true)}
                  className="w-full px-11 py-2 hover:bg-[#2E8B57] text-sm  cursor-pointer rounded-md flex items-center justify-start gap-2 text-red-500 hover:text-white"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      {OpenModal && (
        <Createlogoutmodal
          onClose={() => setOpenModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
};

export default DashboardHeader;
