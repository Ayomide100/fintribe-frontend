import Dashboardlayouts from "@/pages/layouts/Dashboardlayouts";
import Head from "next/head";
import React from "react";
import Verify from "./verify";
import ProgressBar from "./progressbar";
import { Camera } from "lucide-react";
import { useRouter } from "next/router";

const StepThree = () => {
  const router = useRouter();

  return (
    <Dashboardlayouts>
      <Head>
        <title>Fintribe | KYC Step Three</title>
      </Head>
      <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center px-4">
        <div className="w-full md:w-[90%] h-auto md:h-[90%] bg-white shadow-md rounded-md flex flex-col gap-4 items-center py-6">
          {/* Verify */}
          <div className="w-full flex justify-start h-auto md:h-[10%] p-3">
            <Verify />
          </div>

          {/* Progress Bar */}
          <div className="w-full h-auto md:h-[8%] flex justify-center items-center px-2">
            <ProgressBar progress={60} step={3} totalSteps={4} />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-[60%] h-auto border border-[#E0E0E0] rounded-md flex flex-col p-6">
            {/* Header */}
            <div className="w-full flex flex-col gap-1 mb-6">
              <p className="font-semibold text-base md:text-lg">
                Take a selfie
              </p>
              <p className="text-sm text-gray-600">
                Position your face in the frame and take a clear selfie for
                verification
              </p>
            </div>

            {/* Selfie Frame */}
            <div className="flex justify-center items-center mb-6">
              <div className="w-40 h-40 md:w-52 md:h-52 border-2 border-dashed border-green-500 rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14c1.656 0 3-1.567 3-3.5S13.656 7 12 7s-3 1.567-3 3.5S10.344 14 12 14z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6"
                  />
                </svg>
              </div>
            </div>

            {/* Take Selfie Button */}
            <div className="flex justify-center mb-6">
              <button
                type="button"
                className="px-8 flex justify-center gap-4 items-center py-2 rounded-md bg-[#0A2540] border border-gray-300 text-[#F5F5F5] hover:bg-[#1F3B5A] transition"
              >
                Take Selfie
                <Camera size={12} />
              </button>
            </div>

            {/* Selfie Guidelines */}
            <div className="bg-gray-50 rounded-md p-4 mb-6">
              <p className="font-medium text-sm mb-2">Selfie Guidelines:</p>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>Look directly at the camera</li>
                <li>Ensure good lighting on your face</li>
                <li>Remove hats, sunglasses, or mask</li>
                <li>Keep a neutral expression</li>
                <li>Make sure your entire face is visible</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between gap-3">
              <button
                onClick={() => router.back()}
                type="button"
                className="flex-1 px-4 md:px-20 py-2 rounded-md bg-[#84C2A229] border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Back
              </button>
              <button
                onClick={() => router.push("/dashboard/kyc/stepfour")}
                type="submit"
                className="flex-1 px-4 md:px-20 py-2 rounded-md bg-[#0A2540] text-white hover:bg-[#1F3B5A] transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dashboardlayouts>
  );
};

export default StepThree;
