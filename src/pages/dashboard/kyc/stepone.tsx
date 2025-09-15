import Dashboardlayouts from "@/pages/layouts/Dashboardlayouts";
import Head from "next/head";
import React from "react";
import ProgressBar from "./progressbar";
import Verify from "./verify";
import { useRouter } from "next/router";

const StepOne = () => {
  const router = useRouter();
  return (
    <Dashboardlayouts>
      <Head>
        <title>Fintribe | KYC Step One</title>
      </Head>
      <div className="w-full min-h-screen flex justify-center items-center px-4">
        <div className="w-full md:w-[90%] h-auto md:h-[90%] shadow-md rounded-md flex flex-col gap-4 items-center py-6">
          {/* Verify Section */}
          <div className="w-full flex justify-start h-auto md:h-[10%] p-3">
            <Verify />
          </div>

          {/* Progress Bar */}
          <div className="w-full h-auto md:h-[8%] flex justify-center items-center px-2">
            <ProgressBar progress={20} step={1} totalSteps={4} />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-[60%] h-auto md:h-[70%] border border-[#E0E0E0] rounded-md flex flex-col">
            {/* Form Header */}
            <div className="w-full h-auto md:h-[12%] px-3 py-3 flex flex-col justify-center items-start">
              <p className="font-semibold text-base md:text-lg">
                Personal Information
              </p>
              <p className="text-sm text-[#6E6E6E]">
                Please provide your personal details exactly as they appear on
                your ID
              </p>
            </div>

            {/* Form Fields */}
            <form className="flex flex-col gap-4 p-4 md:p-6 flex-1">
              {/* Phone Number */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  placeholder="Enter your full address"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                ></textarea>
              </div>

              <div className="flex justify-between gap-3 mt-6">
                <button
                  onClick={() => router.back()}
                  type="button"
                  className="flex-1 px-4 md:px-24 py-2 rounded-md bg-[#84C2A229] border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Back
                </button>
                <button
                  onClick={() => router.push("/dashboard/kyc/steptwo")}
                  type="submit"
                  className="flex-1 px-4 md:px-24 py-2 rounded-md bg-[#0A2540] text-white hover:bg-[#1F3B5A] transition"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dashboardlayouts>
  );
};

export default StepOne;
