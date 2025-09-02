import {
  Bookmark,
  GraduationCap,
  Home,
  TrendingUp,
  User,
  Settings,
} from "lucide-react";
import React, { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";

const Sidebar = () => {
  const [active, setActive] = useState("Home"); // default active

  const NestedBar = [
    {
      name: "Home",
      icon: <Home size={20} />,
    },
    {
      name: "Opportunities",
      icon: <TrendingUp size={20} />,
    },
    {
      name: "Circles",
      icon: <TbFidgetSpinner size={20} />,
    },
    {
      name: "Learning Hub",
      icon: <GraduationCap size={20} />,
    },
    {
      name: "Saved Items",
      icon: <Bookmark size={20} />,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-around items-center">
      {/* Top Navigation */}
      <div className="w-[88%] h-[45%] bg-white p-2 shadow-lg rounded-md border border-[#E0E0E0] flex flex-col gap-2">
        {NestedBar.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition 
              ${
                active === item.name
                  ? "bg-[#2E8B57] text-white"
                  : " text-gray-700 hover:bg-gray-200"
              }`}
          >
            {item.icon}
            <p className="text-sm font-medium">{item.name}</p>
          </button>
        ))}
      </div>

      {/* Your Activity Card */}
      <div className="w-[88%] h-[30%] bg-white shadow-md border border-[#E0E0E0] rounded-md p-4 flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-gray-800">Your Activity</h3>
        <div className="flex justify-between text-sm text-gray-700">
          <span>Circles Joined</span>
          <span className="font-semibold">5</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <span>Gurus Following</span>
          <span className="font-semibold">12</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <span>Lessons Completed</span>
          <span className="font-semibold">8/15</span>
        </div>
      </div>

      {/* Profile & Settings */}
      <div className="w-[88%] h-[17%] bg-white shadow-md border border-[#E0E0E0] rounded-md flex flex-col">
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md">
          <User size={18} />
          <span>Profile</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-md">
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
