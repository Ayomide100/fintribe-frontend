import React from "react";
import Dashboardlayouts from "../layouts/Dashboardlayouts";
import Head from "next/head";

const Main = () => {
  return (
    <Dashboardlayouts>
      <Head>
        <title>FinTribe || Dashboard</title>
      </Head>
      <div className="w-full h-full bg-blue-500">Main Dashboard Page</div>
    </Dashboardlayouts>
  );
};

export default Main;
