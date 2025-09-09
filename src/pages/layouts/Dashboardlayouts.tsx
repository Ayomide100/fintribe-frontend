import React, { ReactNode, useState } from "react";
import PropTypes from "prop-types";
import DashboardHeader from "../dashboard/dashboardheader";
import Sidebar from "../dashboard/sidebar";
import Otherside from "../dashboard/otherside";
import { useRouter } from "next/router";

interface MainlayoutProps {
  children: ReactNode;
}

const Dashboardlayouts: React.FC<MainlayoutProps> = ({ children }) => {
  const router = useRouter();
  const isMainPage = router.pathname === "/dashboard/main";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full relative">
      <div className="h-[10%]">
        <DashboardHeader
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
      </div>
      <div className="w-full h-[90%] flex bg-amber-400">
        {/* Sidebar Container */}
        <div
          className={`
            transition-all duration-300 ease-in-out
            ${sidebarOpen ? "w-[20%]" : "w-0 md:w-[20%]"}
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
              w-[25%] h-full bg-amber-500 hidden md:block
              transition-all duration-300 ease-in-out
              ${!sidebarOpen ? "md:w-[25%]" : ""}
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
