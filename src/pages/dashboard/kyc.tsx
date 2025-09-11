import React from "react";
import Dashboardlayouts from "../layouts/Dashboardlayouts";
import Head from "next/head";

const Kyc = () => {
  return (
    <Dashboardlayouts>
      <Head>
        <title>Fintribe | KYC Verification</title>
      </Head>
      <div className="w-full h-full p-3 flex justify-center items-center">
        <div className="w-[97%] h-[96%] bg-white shadow-md">
          <div className="w-full h-[10%] bg-red-400"></div>
        </div>
      </div>
    </Dashboardlayouts>
  );
};

export default Kyc;
