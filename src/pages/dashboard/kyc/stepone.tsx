import Dashboardlayouts from "@/pages/layouts/Dashboardlayouts";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import ProgressBar from "./progressbar";
import Verify from "./verify";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const StepOne = () => {
  const router = useRouter();

  // State for form fields
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phone && dob && address) {
      setProgress(25);
    } else {
      setProgress(0);
    }
  }, [phone, dob, address]);

  const handleNext = () => {
    if (progress < 25) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const nigerianPhoneRegex = /^(?:\+234\d{10}|0\d{10})$/;
    if (!nigerianPhoneRegex.test(phone)) {
      toast.error("Please enter a valid Nigerian phone number.");
      return;
    }

    const d = new Date(dob);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const formattedDob = `${day}/${month}/${year}`;

    const stepOneData = { phone, dob: formattedDob, address };

    // merge instead of overwrite
    const existingData = JSON.parse(localStorage.getItem("kyc_data") || "{}");
    const updatedData = { ...existingData, stepOne: stepOneData };

    localStorage.setItem("kyc_data", JSON.stringify(updatedData));

    router.push("/dashboard/kyc/steptwo");
  };

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

          {/* Progress Bar (only show when > 0) */}
          <div className="w-full h-auto md:h-[8%] flex justify-center items-center px-2">
            {progress > 0 && (
              <ProgressBar progress={progress} step={1} totalSteps={4} />
            )}
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
            <form
              className="flex flex-col gap-4 p-4 md:p-6 flex-1"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Phone Number */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-between gap-3 mt-6">
                <button
                  onClick={() => router.back()}
                  type="button"
                  className="flex-1 px-4 md:px-24 py-2 rounded-md bg-[#84C2A229] border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  type="button"
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
