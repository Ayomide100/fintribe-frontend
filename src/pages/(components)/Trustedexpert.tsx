/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  UserPlus,
  Star,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "@/config/axiosconfig";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

// const expertData = [
//   {
//     name: "Adebimpe Thompson",
//     title: "Senior Investment Analyst",
//     isVerified: true,
//     followers: "12,500",
//     posts: "187",
//     successRate: "80%",
//     rating: 4.8,
//     totalInvested: " (234 investors)",
//     experience:
//       "10+ years experience in Nigerian financial markets. Former Goldman Sachs analyst with a track record of identifying high-growth opportunities.",
//     badges: ["Real estate", "Bonds", "Stocks"],
//   },
//   {
//     name: "Adebimpe Thompson",
//     title: "Senior Investment Analyst",
//     isVerified: true,
//     followers: "12,500",
//     posts: "187",
//     successRate: "80%",
//     rating: 4.8,
//     totalInvested: " (234 investors)",
//     experience:
//       "10+ years experience in Nigerian financial markets. Former Goldman Sachs analyst with a track record of identifying high-growth opportunities.",
//     badges: ["Real estate", "Bonds", "Stocks"],
//   },
//   {
//     name: "Adebimpe Thompson",
//     title: "Senior Investment Analyst",
//     isVerified: true,
//     followers: "12,500",
//     posts: "187",
//     successRate: "80%",
//     rating: 4.8,
//     totalInvested: " (234 investors)",
//     experience:
//       "10+ years experience in Nigerian financial markets. Former Goldman Sachs analyst with a track record of identifying high-growth opportunities.",
//     badges: ["Real estate", "Bonds", "Stocks"],
//   },
//   {
//     name: "Adebimpe Thompson",
//     title: "Senior Investment Analyst",
//     isVerified: true,
//     followers: "12,500",
//     posts: "187",
//     successRate: "80%",
//     rating: 4.8,
//     totalInvested: " (234 investors)",
//     experience:
//       "10+ years experience in Nigerian financial markets. Former Goldman Sachs analyst with a track record of identifying high-growth opportunities.",
//     badges: ["Real estate", "Bonds", "Stocks"],
//   },
// ];

const ExpertCard = ({ expert }: any) => {
  const investorCount = expert.rating?.investorCount?.[0]?.investorMembers || 0; // ✅ safe access
  const experience = expert.profileData?.experience || "No experience provided"; // ✅ safe access

  return (
    <div className="w-full h-80 bg-white rounded-lg border border-gray-200 flex flex-col justify-between p-4 hover:shadow-md transition">
      {/* Top Section */}
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative w-12 h-12 flex items-center justify-center border-[#226B44] border-2 bg-gray-300 rounded-full text-gray-700 font-bold">
              {expert.initials}
            </div>

            {/* Name + Title */}
            <div className="flex-col py-2 flex justify-start">
              <div className="flex justify-center items-center gap-1">
                <h3 className="font-semibold text-sm text-gray-900">
                  {expert.fullName}
                </h3>
                <ShieldCheck className="text-[#226B44] w-4 h-4" />
              </div>
              <p className="text-xs text-gray-600 mt-1">{expert.title}</p>
            </div>
          </div>

          {/* Followers + Posts */}
          <div className="text-right text-xs">
            <p className="font-semibold text-gray-900">{expert.followers}</p>
            <span className="text-gray-500">Followers</span>
            <p className="font-semibold text-gray-900 mt-1">{expert.posts}</p>
            <span className="text-gray-500">Posts</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex gap-2 flex-wrap mb-2">
          {expert.investmentTags?.map((badge: string, i: number) => (
            <span
              key={i}
              className="bg-[#0A2540] text-white text-[10px] px-2 py-0.5 rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Rating / Investors Section */}
        <div className="mb-3">
          <div className="flex items-center gap-1 text-xs justify-end">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-gray-700 font-medium">
              {investorCount} investors
            </span>
          </div>
        </div>

        {/* Experience */}
        <p className="text-xs text-gray-600 leading-relaxed flex-1">
          {experience}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-3">
        <button className="flex-1 h-9 text-[#226B44] border-[#226B44] border text-xs font-medium rounded hover:bg-[#226B44] hover:text-white">
          View Profile
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded">
          <MessageSquare className="w-4 h-4 text-gray-600" />
        </button>
        <button className="flex items-center justify-center gap-1 h-9 px-3 bg-[#0A2540] text-white text-xs font-medium rounded hover:bg-[#0d4074]">
          <UserPlus className="w-3 h-3" /> Follow
        </button>
      </div>
    </div>
  );
};

const Trustedexpert = () => {
  const [expertData, setExpertData] = useState<any[]>([]);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.15,
  });

  useEffect(() => {
    const getExpertData = async () => {
      try {
        const response = await axios.get("/users/experts?pages=1&limit=5");
        setExpertData(response.data.content.experts || []);
      } catch (error) {
        if (isAxiosError(error)) {
          const msg =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch experts";
          toast.error(msg);
        }
      }
    };

    getExpertData();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full bg-gray-50 py-10"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-sm text-gray-800 font-medium">Expert Gurus</p>
            <h1 className="text-xl md:text-2xl text-[#226B44] font-semibold">
              Learn from Trusted Experts
            </h1>
            <p className="text-sm text-gray-600 mt-1 max-w-md">
              Follow seasoned investment professionals who share insights, lead
              circles, and guide you through your investment journey.
            </p>
          </div>
          <div className="hidden md:flex">
            <button className="border border-[#2E8B57] font-medium text-[#2E8B57] py-2 px-4 rounded flex items-center gap-2">
              View all <Compass className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable on Mobile */}
        <div className="flex gap-4 overflow-x-auto md:flex-wrap md:justify-center md:overflow-x-hidden pb-4">
          {expertData.map((expert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 shrink-0"
            >
              <ExpertCard expert={expert} />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex md:hidden w-full h-4 mt-5 justify-center items-center">
        <button className="border border-[#2E8B57] font-medium text-[#2E8B57] py-2 px-28 rounded-2xl flex items-center gap-2">
          View all <Compass className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default Trustedexpert;
