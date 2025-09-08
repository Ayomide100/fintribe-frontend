import React, { ReactNode } from "react";
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

  return (
    <div className="h-screen w-full">
      <div className="h-[10%]">
        <DashboardHeader />
      </div>
      <div className="w-full h-[90%] flex justify-around items-center">
        <div className="w-[20%] h-full">
          <Sidebar />
        </div>
        <div className={`h-full ${isMainPage ? "w-[55%]" : "w-[80%]"}`}>
          {children}
        </div>
        {isMainPage && (
          <div className="w-[25%] h-full">
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
