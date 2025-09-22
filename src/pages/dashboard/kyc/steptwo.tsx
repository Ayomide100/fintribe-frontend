import Dashboardlayouts from "@/pages/layouts/Dashboardlayouts";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import Verify from "./verify";
import ProgressBar from "./progressbar";
import { Car, ClipboardList } from "lucide-react";
import { FaPassport } from "react-icons/fa";
import { useRouter } from "next/router";

const StepTwo = () => {
  const router = useRouter();
  const [type, setType] = useState("");
  const [proofId, setproofId] = useState("");

  const [progress, setProgress] = useState(0);

  const idTypes = [
    {
      id: "national_id",
      label: "National ID",
      icon: <ClipboardList />,
    },
    {
      id: "driver_license",
      label: "Driver's License",
      icon: <Car />,
    },
    {
      id: "passport",
      label: "Passport",
      icon: <FaPassport />,
    },
  ];

  // Track progress
  useEffect(() => {
    if (type && proofId) {
      setProgress(40);
    } else {
      setProgress(0);
    }
  }, [type, proofId]);

  const handleNext = () => {
    if (progress < 40) {
      alert("Please select an ID type and enter its number.");
      return;
    }

    const stepTwoData = { type, proofId };

    // merge instead of overwrite
    const existingData = JSON.parse(localStorage.getItem("kyc_data") || "{}");
    const updatedData = { ...existingData, stepTwo: stepTwoData };

    localStorage.setItem("kyc_data", JSON.stringify(updatedData));

    router.push("/dashboard/kyc/stepthree");
  };

  return (
    <Dashboardlayouts>
      <Head>
        <title>Fintribe | KYC Step Two</title>
      </Head>
      <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center px-4">
        <div className="w-full md:w-[90%] h-auto md:h-[90%] bg-white shadow-md rounded-md flex flex-col gap-4 items-center py-6">
          {/* Verify Section */}
          <div className="w-full flex justify-start h-auto md:h-[10%] p-3">
            <Verify />
          </div>

          {/* Progress Bar (only show when > 0) */}
          <div className="w-full h-auto md:h-[8%] flex justify-center items-center px-2">
            {progress > 0 && (
              <ProgressBar progress={progress} step={2} totalSteps={4} />
            )}
          </div>

          {/* Form Section */}
          <div className="w-full md:w-[60%] h-auto md:h-[70%] border border-[#E0E0E0] rounded-md flex flex-col">
            {/* Form Header */}
            <div className="w-full h-auto md:h-[12%] px-6 py-4 flex flex-col justify-center items-start border-b border-[#F0F0F0]">
              <p className="font-semibold text-base md:text-lg text-gray-900">
                Document Upload
              </p>
              <p className="text-sm text-[#6E6E6E] mt-1">
                Provide your government-issued ID details
              </p>
            </div>

            {/* Form Content */}
            <form
              className="flex flex-col gap-6 p-6 flex-1"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Select ID Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select ID Type<span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {idTypes.map((idType) => (
                    <label
                      key={idType.id}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                        type === idType.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="idType"
                        value={idType.id}
                        checked={type === idType.id}
                        onChange={(e) => setType(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center w-full">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded mr-3">
                          <span className="text-lg">{idType.icon}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {idType.label}
                        </span>
                        {type === idType.id && (
                          <div className="ml-auto">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* ID Number Field */}
              {type && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {type === "national_id" && "National ID Number"}
                    {type === "drivers_license" && "Driver’s License Number"}
                    {type === "passport" && "Passport Number"}
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter your ${
                      idTypes.find((t) => t.id === type)?.label || "ID"
                    } number`}
                    value={proofId}
                    onChange={(e) => setproofId(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              )}

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

export default StepTwo;
