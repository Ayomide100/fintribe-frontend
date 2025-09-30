import React, { useState, useEffect } from "react";
import {
  EllipsisVertical,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  ShieldCheck,
  Settings,
} from "lucide-react";
import { TbFidgetSpinner, TbLockAccess } from "react-icons/tb";
import axios from "@/config/axiosconfig";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";

type Circle = {
  _id: string;
  name: string;
  icon?: { url: string };
  type?: string;
  totalMembers?: number;
  lastMessage?: { text: string };
};

const MyCircles = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);

  console.log(selectedCircle);

  const [myCircles, setMyCircles] = useState<Circle[]>([]);
  const [accountType, setAccountType] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getAllMyCircles = async () => {
    try {
      const res = await axios.get("/circle/creator?page=1&limit=6", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.content.circles);
      setMyCircles(res.data.content.circles);
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

  const getUser = async () => {
    try {
      const res = await axios("/users/profile", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.content.user.account_type);

      setAccountType(res.data.content.user.account_type);
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
    getAllMyCircles();
    getUser();
  }, []);

  const posts = [
    {
      id: 1,
      author: "Adebimpe Thompson",
      role: "Real Estate Expert",
      timeAgo: "3h",
      content:
        "The Nigerian real estate market is showing strong fundamentals despite global uncertainties. Here's why I'm bullish on commercial properties in Lagos and Abuja for 2024.",
      image: true,
      likes: 12,
      comments: 12,
      shares: 12,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
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
                    className="rounded-full object-contain w-2 h-2"
                  />
                </div>

                <h1 className="text-lg font-semibold">{selectedCircle.name}</h1>
              </div>
            ) : (
              <p className="text-gray-500 italic">Tap to view your circles</p>
            )}

            <div className="flex gap-3">
              {accountType === "user" ? (
                <div className="bg-white  px-2 py-2 rounded-md">
                  <EllipsisVertical size={18} />
                </div>
              ) : (
                <>
                  <div className="bg-white shadow-md px-2 py-2 rounded-md">
                    <FiEdit size={18} />
                  </div>
                  <div className="bg-white shadow-md px-2 py-2 rounded-md">
                    <Settings size={18} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className={`flex ${isMobile ? "flex-col" : "gap-6"}`}>
          {/* Sidebar - Joined Circles */}
          <div className={`${isMobile ? "w-full mb-6" : "w-80"} flex-shrink-0`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                <TbFidgetSpinner className="text-green-600" size={24} />
                <h2 className="font-semibold text-base">Joined Circles</h2>
              </div>
              <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {myCircles.map((circle) => (
                  <div
                    key={circle._id}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedCircle(circle)}
                  >
                    <div className="flex items-center gap-3">
                      {/* Circle Icon */}
                      <div className="w-[50px] h-[50px] border-2 border-[#226B44] rounded-full flex justify-center items-center">
                        <Image
                          src={circle.icon?.url || "/default-circle.png"}
                          alt={circle.name}
                          width={40}
                          height={40}
                          className=" rounded-full object-cover flex-shrink-0"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm truncate">
                            {circle.name}
                          </p>
                          {/* Example: verified badge if you have that logic */}
                          {circle.type === "public" && (
                            <span className="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0"></span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <TbLockAccess className="inline-block w-4 h-4 mr-1 text-[#226B44]" />
                          {circle.totalMembers} Members
                        </p>
                        {/* Optional: show last message preview */}
                        {circle.lastMessage && (
                          <p className="text-xs text-gray-400 truncate mt-1">
                            {circle.lastMessage.text}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feed */}
          <div className="flex-1 space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                {/* Post Header */}
                <div className="p-4 flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm">{post.author}</h3>
                        <span
                          className="text
                                        text-[#2E8B57] text-xs"
                        >
                          <ShieldCheck size={15} />
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{post.role}</p>
                      <p className="text-xs text-gray-400">{post.timeAgo}</p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <EllipsisVertical size={20} className="text-gray-400" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {post.content}
                  </p>
                </div>

                {/* Post Image */}
                {post.image && (
                  <div className="relative">
                    <div className="w-full aspect-video bg-gradient-to-br from-green-900 via-green-800 to-teal-900 flex items-center justify-center relative overflow-hidden">
                      {/* Animated chart arrows */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-3/4 h-3/4" viewBox="0 0 200 200">
                          <defs>
                            <linearGradient
                              id="arrowGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                style={{
                                  stopColor: "#10b981",
                                  stopOpacity: 0.8,
                                }}
                              />
                              <stop
                                offset="100%"
                                style={{
                                  stopColor: "#34d399",
                                  stopOpacity: 0.9,
                                }}
                              />
                            </linearGradient>
                          </defs>
                          <path
                            d="M20 180 L60 140 L100 160 L140 100 L180 20"
                            stroke="url(#arrowGradient)"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                          />
                          <polygon
                            points="180,20 170,30 180,35 190,30"
                            fill="#34d399"
                          />

                          <path
                            d="M40 170 L70 130 L110 150 L150 90 L185 35"
                            stroke="url(#arrowGradient)"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            opacity="0.6"
                          />
                          <polygon
                            points="185,35 175,43 185,48 195,43"
                            fill="#34d399"
                            opacity="0.6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Post Actions */}
                <div className="px-4 py-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="flex items-center gap-4 text-gray-500">
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={16} />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={16} />
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 size={16} />
                        {post.shares}
                      </span>
                    </div>
                    <button>
                      <Bookmark
                        size={18}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCircles;
