import {
  Bookmark,
  GraduationCap,
  Home,
  TrendingUp,
  User,
  Settings,
} from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { MdClose } from "react-icons/md";
import { TbFidgetSpinner } from "react-icons/tb";

interface Props {
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
}

const Sidebar: React.FC<Props> = ({ setSidebarOpen, sidebarOpen }) => {
  const router = useRouter();

  const NestedBar = [
    {
      name: "Home",
      icon: <Home size={20} />,
      path: "/dashboard/main",
    },
    {
      name: "Opportunities",
      icon: <TrendingUp size={20} />,
      path: "/dashboard/opportunities",
    },
    {
      name: "Circles",
      icon: <TbFidgetSpinner size={20} />,
      path: "/dashboard/circles",
    },
    {
      name: "Learning Hub",
      icon: <GraduationCap size={20} />,
      path: "/dashboard/learninghub",
    },
    {
      name: "Saved Items",
      icon: <Bookmark size={20} />,
      path: "/dashboard/saveditems",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:relative inset-y-0 left-0 z-50 
          w-80 md:w-full h-full 
          bg-gray-50 
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
          ${!sidebarOpen ? "md:w-0 md:overflow-hidden" : ""}
          flex flex-col justify-around items-center
        `}
      >
        <button
          className="absolute bg-pink-500 top-2 right-4 md:hidden z-10"
          onClick={() => setSidebarOpen(false)}
        >
          <MdClose size={28} />
        </button>

        {/* Top Navigation */}
        <div className="w-[88%] h-[45%] bg-white p-2 shadow-lg rounded-md border border-[#E0E0E0] flex flex-col gap-2">
          {NestedBar.map((item) => {
            const isActive = router.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => {
                  router.push(item.path);
                  // Close mobile sidebar after navigation
                  if (window.innerWidth < 768) {
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition
                  ${
                    isActive
                      ? "bg-[#2E8B57] text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {item.icon}
                <p className="text-sm font-medium">{item.name}</p>
              </button>
            );
          })}
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
    </>
  );
};

export default Sidebar;
