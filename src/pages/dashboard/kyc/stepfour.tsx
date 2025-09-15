import Dashboardlayouts from "@/pages/layouts/Dashboardlayouts";
import Head from "next/head";
import React from "react";
import Verify from "./verify";
import ProgressBar from "./progressbar";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const StepFour = () => {
  return (
    <Dashboardlayouts>
      <Head>
        <title>Fintribe | KYC Step Four (Review)</title>
      </Head>
      <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center px-4">
        <div className="w-full md:w-[90%] h-auto md:h-[90%] bg-white shadow-md rounded-md flex flex-col gap-4 items-center py-6">
          {/* Verify */}
          <div className="w-full flex justify-start h-auto md:h-[10%] p-3">
            <Verify />
          </div>

          {/* Progress Bar */}
          <div className="w-full h-auto md:h-[8%] flex justify-center items-center px-2">
            <ProgressBar progress={80} step={4} totalSteps={4} />
          </div>

          {/* Review Section */}
          <div className="w-full md:w-[60%] h-auto border border-[#E0E0E0] rounded-md flex flex-col p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-base md:text-lg">
                Review and Submit
              </p>
              <p className="text-sm text-gray-600">
                Please review your information before submitting for
                verification
              </p>
            </div>

            {/* Personal Information */}
            <div className="flex justify-between items-start border-b border-[#E0E0E0] pb-4">
              <div>
                <p className="font-medium text-sm mb-1">Personal Information</p>
                <p className="text-sm text-gray-700">Phone number</p>
                <p className="text-sm text-black font-semibold">
                  +2349077879087
                </p>
                <p className="text-sm text-gray-700 mt-2">Date of birth</p>
                <p className="text-sm text-black font-semibold">
                  September 10, 2025
                </p>
                <p className="text-sm text-gray-700 mt-2">Address</p>
                <p className="text-sm text-black font-semibold">
                  Mr. John Smith, 123 Main Street, Anytown, CA 12345, USA.
                </p>
              </div>
              <PencilSquareIcon className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>

            {/* Identity Documents */}
            <div className="flex justify-between items-start border-b border-[#E0E0E0] pb-4">
              <div>
                <p className="font-medium text-sm mb-1">Identity Documents</p>
                <p className="text-sm text-gray-700">National ID Number</p>
                <p className="text-sm text-black font-semibold">87593048394</p>
              </div>
              <PencilSquareIcon className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>

            {/* Identity Verification Selfie */}
            <div className="flex justify-between items-start border-b border-[#E0E0E0] pb-4">
              <div>
                <p className="font-medium text-sm mb-1">
                  Identity Verification Selfie
                </p>
                <p className="text-sm text-gray-700">Selfie Captured</p>
                <span className="inline-block px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                  Captured
                </span>
              </div>
              <PencilSquareIcon className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>

            {/* Important Notice */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <p className="font-medium text-sm mb-2">Important Notice:</p>
              <p className="text-sm text-gray-600">
                By submitting this verification, you confirm that all
                information provided is accurate and belongs to you. False
                information may result in account suspension.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between gap-3">
              <button
                type="button"
                className="flex-1 px-2 md:px-2 py-2 rounded-md bg-[#84C2A229] border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 px-2 md:px-2 py-2 rounded-md bg-[#0A2540] text-white hover:bg-[#1F3B5A] transition"
              >
                Submit for Verification
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dashboardlayouts>
  );
};

export default StepFour;
