import React, { useState, useEffect } from "react";
import axios from "@/config/axiosconfig";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import Image from "next/image";
import { EllipsisVertical, Settings } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import CircleSidebar from "./circlesidebar";
import CircleFeed from "./circlefeed";
import { getTimeAgo } from "@/utils/utils";

type Circle = {
  _id: string;
  name: string;
  icon?: { url: string };
  type?: string;
  totalMembers?: number;
  unreadCount?: number;
};

const JoinedCircles = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [joinedCircles, setJoinedCircles] = useState<Circle[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getUser = async () => {
    try {
      const res = await axios("/users/profile", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      setAccountType(res.data.content.user.account_type);
    } catch (error) {
      if (isAxiosError(error)) {
        const msg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to fetch user";
        toast.error(msg);
      }
    }
  };

  const getAllJoinedCircles = async () => {
    try {
      const res = await axios.get("/circle/me?page=1&limit=6", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      setJoinedCircles(res.data.content.circles);
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        const apiError = error.response?.data?.error;
        const fallback = error.message || "An unexpected error occurred";
        const errorMsg =
          `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
          fallback;
        toast.error(errorMsg);
      }
    }
  };

  useEffect(() => {
    getAllJoinedCircles();
    getUser();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 relative">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {selectedCircle ? (
              <div className="flex items-center gap-2">
                <div className="w-[50px] h-[50px] border-2 border-[#226B44] rounded-full flex justify-center items-center">
                  <Image
                    src={selectedCircle.icon?.url || "/default-circle.png"}
                    alt={selectedCircle.name}
                    width={32}
                    height={32}
                    className="rounded-full object-contain"
                  />
                </div>
                <h1 className="text-lg font-semibold">{selectedCircle.name}</h1>
              </div>
            ) : (
              <p className="text-gray-500 italic">Tap to view joined circles</p>
            )}

            <div className="flex gap-3">
              {accountType === "user" ? (
                <div className="bg-white px-2 py-2 rounded-md">
                  <EllipsisVertical size={18} />
                </div>
              ) : (
                <>
                  <div className="bg-white shadow-md px-2 py-1 rounded-md">
                    <FiEdit size={18} />
                  </div>
                  <div className="bg-white shadow-md px-2 py-1 rounded-md">
                    <Settings size={18} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <CircleSidebar
          isMobile={isMobile}
          myCircles={joinedCircles}
          selectedCircle={selectedCircle}
          setSelectedCircle={setSelectedCircle}
          title="Joined Circles"
        />

        {/* Feed / Placeholder */}
        <div className="flex-1">
          {selectedCircle ? (
            <CircleFeed
              selectedCircle={selectedCircle}
              getTimeAgo={getTimeAgo}
            />
          ) : (
            // 🟢 Placeholder when no circle is selected
            <div className="h-full flex flex-col items-center justify-center text-center bg-white rounded-lg border border-gray-200 shadow-sm p10 py-16">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h2 className="text-gray-700 font-semibold text-lg">
                No Circle Selected
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Tap on a circle from the left sidebar to view its posts and
                updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinedCircles;
