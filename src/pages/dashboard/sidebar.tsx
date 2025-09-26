import axios from "@/config/axiosconfig";
import { clearGuru } from "@/Global/GuruSlice";
import { clearPartner } from "@/Global/PartnerSlice";
import { clearUser } from "@/Global/UserSlice";
import Createlogoutmodal from "@/Modals/createlogoutmodal";
import { isAxiosError } from "axios";
import {
  Bookmark,
  GraduationCap,
  Home,
  TrendingUp,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { TbFidgetSpinner } from "react-icons/tb";
import { useDispatch } from "react-redux";

interface Props {
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
}

const activityByRole: Record<string, { label: string; value: string }[]> = {
  user: [
    { label: "Circles Joined", value: "5" },
    { label: "Gurus Following", value: "12" },
    { label: "Lessons Completed", value: "8/15" },
  ],
  expert: [
    { label: "Circles Created", value: "3" },
    { label: "Followers", value: "250" },
    { label: "Lessons Contributed", value: "14" },
  ],
  partner: [
    { label: "Listings", value: "7" },
    { label: "Average Impressions", value: "12.5K" },
  ],
};

const Sidebar: React.FC<Props> = ({ setSidebarOpen, sidebarOpen }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const [openModal, setopenModal] = useState(false);

  const handleLogout = () => {
    dispatch(clearGuru());
    dispatch(clearUser());
    dispatch(clearPartner());
    localStorage.clear();
    router.push("/auth/login");
  };

  const [accountType, setAccountType] = useState<string | null>(null);

  const getUser = async () => {
    try {
      const res = await axios("/users/profile", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      console.log(res.data.content.user.account_type);

      setAccountType(res.data.content.user.account_type);
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        const apiError = error.response?.data?.error;
        const fallback = error.message || "An unexpected error occurred";

        const errorMsg =
          `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
          fallback;

        toast.error(errorMsg);
      }
    }
  };

  // fetch once when component mounts
  useEffect(() => {
    getUser();
  }, []);

  const allItems = [
    {
      name: "Home",
      icon: <Home size={20} />,
      path: "/dashboard/main",
      roles: ["user", "partner", "expert"], // visible to all
    },
    {
      name: "Opportunities",
      icon: <TrendingUp size={20} />,
      path: "/dashboard/opportunities",
      roles: ["user", "expert", "partner"], // not for partners
    },
    {
      name: "Circles",
      icon: <TbFidgetSpinner size={20} />,
      path: "/dashboard/circles",
      roles: ["user", "expert"],
    },
    {
      name: "Learning Hub",
      icon: <GraduationCap size={20} />,
      path: "/dashboard/learninghub",
      roles: ["user", "expert"], // only for users
    },
    {
      name: "Saved Items",
      icon: <Bookmark size={20} />,
      path: "/dashboard/saveditems",
      roles: ["user", "expert", "partner"], // partners won’t see
    },
  ];

  const NestedBar = allItems.filter((item) =>
    item.roles.includes(accountType || "")
  );

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
          fixed md:relative inset-y-0 right-0 z-50 
          w-80 md:w-full h-full  
          bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
          flex flex-col justify-between  items-center
        `}
      >
        <div className="md:hidden w-full flex justify-end p-3 border-b border-gray-200">
          <button
            className="w-9 h-9 flex items-center justify-center rounded-md border bg-[#84C2A27A] border-gray-300 hover:bg-gray-100 transition"
            onClick={() => setSidebarOpen(false)}
          >
            <MdClose size={22} className="text-gray-700" />
          </button>
        </div>

        {/* Top Navigation */}
        <div
          className={`
    w-[88%] bg-white p-2 md:shadow-lg shadow-0  rounded-md border border-[#E0E0E0] 
    flex flex-col gap-2 transition-all
    ${
      NestedBar.length <= 3
        ? "h-[35%]  justify-center"
        : "max-h-[79vh] overflow-y-auto "
    }
  `}
        >
          {NestedBar.map((item) => {
            const isActive = router.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => {
                  router.push(item.path);
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
        {accountType && activityByRole[accountType] && (
          <div className="w-[88%] bg-white shadow-md border border-[#E0E0E0] rounded-md p-4 flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-800">
              Your Activity
            </h3>

            {activityByRole[accountType].map((activity, idx) => (
              <div
                key={idx}
                className="flex justify-between text-sm text-gray-700"
              >
                <span>{activity.label}</span>
                <span className="font-semibold">{activity.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Profile & Settings */}
        <div className="w-[88%] md:h-[17%] h-[16%] bg-white shadow-md border border-[#E0E0E0] rounded-md flex flex-col">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md">
            <User size={18} />
            <span>Profile</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-md">
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button
            onClick={() => setopenModal(true)}
            className="flex items-center gap-2 px-3 text-red-500 py-2 text-sm md:hidden hover:bg-gray-100 rounded-b-md"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      {openModal && (
        <Createlogoutmodal
          onClose={() => setopenModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </>
  );
};

export default Sidebar;
