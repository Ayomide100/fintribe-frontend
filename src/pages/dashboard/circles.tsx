import Head from "next/head";
import React from "react";
import Dashboardlayouts from "../layouts/Dashboardlayouts";

const Circles = () => {
  return (
    <Dashboardlayouts>
      <Head>
        <title> FinTribe || Circles</title>
      </Head>
      <div className="w-full h-full  px-5 py-6 space-y-4">
        <div className="w-full h-[27%] ">
          <div className="w-full h-[50%]  flex justify-between items-center">
            <div className="w-[50%] h-full flex justify-center flex-col items-start">
              <p className=" text-lg font-medium">Investment Circles</p>
              <p className=" text-sm text-[#6E6E6E]">
                Connect with like-minded investors and industry experts
              </p>
            </div>
            <div className="w-[20%] h-full flex justify-center items-center">
              <button className="bg-[#0A2540] text-white px-4 py-2 rounded-md">
                Create a Circle +{" "}
              </button>
            </div>
          </div>
          <div className="w-full h-[40%]   flex justify-center items-center">
            <div className="w-full h-[80%] border border-[#E0E0E0] flex justify-around items-center rounded-md bg-[#FAFBFB] ">
              <div className="w-[30%] border rounded-md border-[#E0E0E0]  h-[90%] bg-white flex justify-center items-center">
                My Circles
              </div>
              <div className="w-[25%] h-[90%]  flex justify-center items-center">
                Joined Circles
              </div>
              <div className="w-[25%] h-[90%]  flex justify-center items-center">
                Explore Circles
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[90%] bg-amber-300 overflow-y-auto scrollbar-thin scrollbar-hide">
          <div className="w-full h-[15%] bg-red-400"></div>
        </div>
      </div>
    </Dashboardlayouts>
  );
};

export default Circles;
