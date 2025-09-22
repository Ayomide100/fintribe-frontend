import Dashboardlayouts from "@/pages/layouts/Dashboardlayouts";
import Head from "next/head";
import React, { useState } from "react";
import Verify from "./verify";
import ProgressBar from "./progressbar";
import { Camera } from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setFile } from "@/Global/uploadSlice";

const StepThree = () => {
  const router = useRouter();
  const [selfie, setSelfie] = useState<string | null>(null);

  const dispatch = useDispatch();
  const handleSelfieCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files && files[0];
    if (file) {
      // For preview (base64)
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelfie(base64String);

        // Save preview + filename in localStorage
        const existingData = JSON.parse(
          localStorage.getItem("kyc_data") || "{}"
        );
        const updatedData = {
          ...existingData,
          avatarPreview: base64String,
          avatarFileName: file.name,
        };
        localStorage.setItem("kyc_data", JSON.stringify(updatedData));

        // ✅ Keep File object in Redux (for backend upload later)
        dispatch(setFile(file));
      };
      reader.readAsDataURL(file);
    }
  };

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

            {/* Selfie Preview */}
            <div className="flex justify-center items-center mb-6">
              {selfie ? (
                <Image
                  src={selfie}
                  alt="Selfie Preview"
                  width={200}
                  height={200}
                  className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-md border"
                />
              ) : (
                <div className="w-40 h-40 md:w-52 md:h-52 border-2 border-dashed border-green-500 rounded-md flex items-center justify-center">
                  <Camera className="text-gray-400 w-10 h-10" />
                </div>
              )}
            </div>

            {/* Take Selfie Button */}
            <div className="flex justify-center mb-6">
              <label
                htmlFor="selfieInput"
                className="px-8 flex justify-center gap-4 items-center py-2 rounded-md bg-[#0A2540] border border-gray-300 text-[#F5F5F5] hover:bg-[#1F3B5A] transition cursor-pointer"
              >
                {selfie ? "Retake Selfie" : "Take Selfie"}
                <Camera size={12} />
              </label>
              <input
                id="selfieInput"
                type="file"
                accept="image/*"
                capture="user"
                className="hidden"
                onChange={handleSelfieCapture}
              />
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
                disabled={!selfie} // disable until selfie taken
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
