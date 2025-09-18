import React, { ReactNode, useEffect, useState } from "react";
import PropTypes from "prop-types";
import DashboardHeader from "../dashboard/dashboardheader";
import Sidebar from "../dashboard/sidebar";
import Otherside from "../dashboard/otherside";
import { useRouter } from "next/router";
import axios from "@/config/axiosconfig";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

interface MainlayoutProps {
  children: ReactNode;
}

const Dashboardlayouts: React.FC<MainlayoutProps> = ({ children }) => {
  const router = useRouter();
  const isMainPage = router.pathname === "/dashboard/main";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const getUser = async () => {
    try {
      const res = await axios("/users/profile", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        const apiError = error.response?.data?.error;
        const fallback = error.message || "An unexpected error occurred";

        const errorMsg =
          `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
          fallback;

        toast.error(errorMsg);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="h-screen w-full relative">
      {/* Header */}
      <div className="h-[10%]">
        <DashboardHeader
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
      </div>

      {showBanner && (
        <div className="relative w-full md:h-[10%] h-[15%] bg-[#1F3B5A] text-white px-4 py-2 flex items-center justify-between text-sm">
          {/* Mobile close button - absolute top-right */}
          <button
            onClick={() => setShowBanner(false)}
            className="absolute top-2 right-3 text-white block md:hidden hover:text-gray-200 text-2xl leading-none"
          >
            ×
          </button>

          {/* Banner content */}
          <div className="flex items-center gap-2 md:justify-start w-[90%] justify-center md:flex-row flex-col">
            <p className="text-center">
              Complete Identity Verification to fully access all Fintribe
              Features
            </p>
            <button
              className="text-[#84C2A2] px-3 py-1 rounded text-xs font-medium hover:bg-gray-100"
              onClick={() => {
                router.push("/dashboard/kyc");
                console.log("Verify now clicked");
              }}
            >
              Verify Now →
            </button>
          </div>

          {/* Desktop close button - stays inline */}
          <button
            onClick={() => setShowBanner(false)}
            className="text-white hidden md:block hover:text-gray-200 text-lg leading-none"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Layout */}
      <div
        className={`w-full flex transition-all duration-300 ${
          showBanner ? "h-[calc(90%-48px)]" : "h-[90%]"
        }`}
      >
        {/* Sidebar Container */}
        <div
          className={`
            transition-all duration-300 ease-in-out
            ${sidebarOpen ? "w-[20%]" : "w-0 md:w-[26%]"}
            h-full relative
          `}
        >
          <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        </div>

        {/* Main Content */}
        <div
          className={`
            h-full transition-all duration-300 ease-in-out
            ${!sidebarOpen ? "w-full" : "w-[80%]"}
            ${isMainPage && sidebarOpen ? "md:w-[55%]" : ""}
            ${isMainPage && !sidebarOpen ? "md:w-[75%]" : ""}
          `}
        >
          {children}
        </div>

        {/* Right Sidebar - Only on main page */}
        {isMainPage && (
          <div
            className={`
              w-[25%] h-full hidden md:block
              transition-all duration-300 ease-in-out
              ${!sidebarOpen ? "md:w-[32%]" : ""}
            `}
          >
            <Otherside />
          </div>
        )}
      </div>
    </div>
  );
};

Dashboardlayouts.propTypes = {
  children: PropTypes.node,
};

export default Dashboardlayouts;
