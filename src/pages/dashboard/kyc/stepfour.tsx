/* eslint-disable react-hooks/exhaustive-deps */
import Dashboardlayouts from "@/pages/layouts/Dashboardlayouts";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Verify from "./verify";
import ProgressBar from "./progressbar";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "@/config/axiosconfig";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";
import { RootState } from "@/Global/Store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFile } from "@/Global/uploadSlice";

type StepOneType = {
  phone?: string;
  dob?: string; // stored as dd/mm/yyyy
  address?: string;
};

type StepTwoType = {
  proofId?: string;
  type?: string;
};

const StepFour = () => {
  const router = useRouter();
  const [stepOne, setStepOne] = useState<StepOneType>({});
  const [stepTwo, setStepTwo] = useState<StepTwoType>({});
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const file = useSelector((state: RootState) => state.upload.file);

  console.log(file);

  console.log(avatar);

  console.log("Stored kyc_data:", localStorage.getItem("kyc_data"));

  useEffect(() => {
    if (!file) {
      toast.error("Selfie file is missing, please re-upload.");
    }
  }, [file]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("kyc_data") || "{}");

    if (storedData.stepOne) setStepOne(storedData.stepOne);
    if (storedData.stepTwo) setStepTwo(storedData.stepTwo);
    if (storedData.avatarPreview) setAvatar(storedData.avatarPreview);

    // ✅ Rehydrate Redux file correctly
    if (!file && storedData.avatarPreview && storedData.avatarFileName) {
      fetch(storedData.avatarPreview)
        .then((res) => res.blob())
        .then((blob) => {
          // 👇 Create a real File object
          const restoredFile = new File([blob], storedData.avatarFileName, {
            type: blob.type || "image/jpeg",
          });

          dispatch(setFile(restoredFile));
        })
        .catch(() => {
          toast.error("Failed to restore selfie file, please re-upload.");
        });
    }
  }, []);

  // Convert dd/mm/yyyy -> yyyy-mm-dd for editing
  const getDobForInput = (dob?: string) => {
    if (!dob) return "";
    const [day, month, year] = dob.split("/");
    return `${year}-${month}-${day}`;
  };

  // Convert yyyy-mm-dd -> dd/mm/yyyy when saving
  const formatDob = (value: string) => {
    const d = new Date(value);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async () => {
    if (!avatar) {
      toast.error("Please upload a selfie before submitting.");
      return;
    }

    const loadingId = toast.loading("Updating KYC...");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("phone", stepOne?.phone || "");
      formData.append("dob", stepOne?.dob || "");
      formData.append("address", stepOne?.address || "");
      formData.append("proofId", stepTwo?.proofId || "");
      formData.append("type", stepTwo?.type || "");

      let avatarFile = file;

      // 🔥 Ensure it's really a File
      if (!(avatarFile instanceof File) && avatar) {
        const res = await fetch(avatar);
        const blob = await res.blob();
        avatarFile = new File([blob], "selfie.jpg", { type: blob.type });
      }

      if (avatarFile) {
        formData.append("avatar", avatarFile); // ✅ only once
      } else {
        toast.error("Selfie file is missing, please re-upload.");
        return;
      }

      const res = await axios.put("/users/update-kyc", formData, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      router.push("/dashboard/kyc/laststep");
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        const apiError = error.response?.data?.error;
        const fallback = error.message || "An unexpected error occurred";

        const errorMsg =
          `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
          fallback;

        toast.error(errorMsg);
      } else {
        toast.error("Error occurred");
      }
    } finally {
      setLoading(false);
      toast.dismiss(loadingId);
    }
  };

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
          <div className="w-full md:w-[60%] border border-[#E0E0E0] rounded-md flex flex-col p-6 space-y-6">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-base md:text-lg">
                Review and Submit
              </p>
              <p className="text-sm text-gray-600">
                Please review your information before submitting for
                verification
              </p>
            </div>

            {/* Step One Data */}
            <div className="flex justify-between items-start border-b border-[#E0E0E0] pb-4">
              <div>
                <p className="font-medium text-sm mb-1">Personal Information</p>
                {editMode ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={stepOne.phone || ""}
                      onChange={(e) =>
                        setStepOne({ ...stepOne, phone: e.target.value })
                      }
                      className="border-2 border-[#226B44] p-2 rounded"
                      placeholder="Enter phone"
                    />
                    <input
                      type="date"
                      value={getDobForInput(stepOne.dob)}
                      onChange={(e) =>
                        setStepOne({
                          ...stepOne,
                          dob: formatDob(e.target.value),
                        })
                      }
                      className="border-2 border-[#226B44] p-2 rounded"
                    />
                    <input
                      type="text"
                      value={stepOne.address || ""}
                      onChange={(e) =>
                        setStepOne({ ...stepOne, address: e.target.value })
                      }
                      className="border-2 border-[#226B44] p-2 rounded"
                      placeholder="Enter address"
                    />
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-700">Phone number</p>
                    <p className="text-sm font-semibold">
                      {stepOne?.phone || "Not provided"}
                    </p>

                    <p className="text-sm text-gray-700 mt-2">Date of Birth</p>
                    <p className="text-sm font-semibold">
                      {stepOne?.dob || "Not provided"}
                    </p>

                    <p className="text-sm text-gray-700 mt-2">Address</p>
                    <p className="text-sm font-semibold">
                      {stepOne?.address || "Not provided"}
                    </p>
                  </>
                )}
              </div>

              <PencilSquareIcon
                onClick={() => setEditMode(!editMode)}
                className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600"
              />
            </div>

            {/* Step Two Data */}
            <div className="flex justify-between items-start border-b border-[#E0E0E0] pb-4">
              {editMode ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={stepTwo.proofId || ""}
                    onChange={(e) =>
                      setStepTwo({ ...stepTwo, proofId: e.target.value })
                    }
                    className="border p-2 rounded"
                    placeholder="Enter ID Number"
                  />
                  <select
                    value={stepTwo.type || ""}
                    onChange={(e) =>
                      setStepTwo({ ...stepTwo, type: e.target.value })
                    }
                    className="border p-2 rounded"
                  >
                    <option value="">Select ID Type</option>
                    <option value="national_id">National ID</option>
                    <option value="passport">Passport</option>
                    <option value="drivers_license">Driver’s License</option>
                  </select>
                </div>
              ) : (
                <>
                  <div>
                    <p className="font-medium text-sm mb-1">
                      Identity Documents
                    </p>

                    <p className="text-sm text-gray-700">ID Number</p>
                    <p className="text-sm font-semibold">
                      {stepTwo?.proofId || "Not provided"}
                    </p>

                    <p className="text-sm text-gray-700 mt-2">ID Type</p>
                    <p className="text-sm font-semibold">
                      {stepTwo?.type || "Not provided"}
                    </p>
                  </div>

                  <PencilSquareIcon
                    onClick={() => setEditMode(!editMode)}
                    className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600"
                  />
                </>
              )}
            </div>

            {/* Selfie */}
            <div className="flex justify-between items-start border-b border-[#E0E0E0] pb-4">
              <div>
                <p className="font-medium text-sm mb-1">
                  Identity Verification Selfie
                </p>
                {avatar ? (
                  <Image
                    src={avatar}
                    alt="Selfie"
                    width={200}
                    height={200}
                    className="w-20 h-20 rounded-full object-cover border"
                  />
                ) : (
                  <span className="text-sm text-gray-500">
                    No selfie captured
                  </span>
                )}
              </div>
              <PencilSquareIcon className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>

            {/* Important Notice */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <p className="font-medium text-sm mb-2">Important Notice:</p>
              <p className="text-sm text-gray-600">
                By submitting this verification, you confirm that all
                information provided is accurate and belongs to you.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between gap-3">
              <button
                onClick={() => router.back()}
                type="button"
                className="flex-1 px-2 py-2 rounded-md bg-[#84C2A229] border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="flex-1 px-2 py-2 rounded-md bg-[#0A2540] text-white hover:bg-[#1F3B5A] transition"
              >
                {loading ? (
                  <span className="flex justify-center text-white items-center">
                    <BiLoaderCircle className="mr-2 animate-spin" size={22} />
                  </span>
                ) : (
                  <span>Submit for Verification</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dashboardlayouts>
  );
};

export default StepFour;
