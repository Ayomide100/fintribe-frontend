import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  TrendingUp,
  ChartColumnBig,
} from "lucide-react";
import Dashboardlayouts from "../../layouts/Dashboardlayouts";
import Head from "next/head";
import axios from "@/config/axiosconfig";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useRouter } from "next/router";

const Opportunities = () => {
  const [accountType, setAccountType] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  const summary = [
    {
      label: "Total opportunities created ",
      count: 12,
      icon: <TrendingUp size={25} />,
    },
    {
      label: "Active Opportunities",
      count: 13,
      icon: <TrendingUp size={25} />,
    },
    {
      label: "Closed opportunities",
      count: 1,
      icon: <TbFidgetSpinner size={25} />,
    },
    {
      label: "Average ROI",
      count: 4,
      icon: <ChartColumnBig size={25} />,
    },
  ];

  const opportunities = [
    {
      title: "Lagos Real Estate",
      company: "Sterling Properties",
      roi: "18–22%",
      duration: "24 months",
      category: "Real Estate",
      risk: "Low Risk",
      minInvestment: "₦250,000",
      rating: "4.6 (234 investors)",
      tagColor: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Lagos Real Estate",
      company: "Sterling Properties",
      roi: "35–50%",
      duration: "24 months",
      category: "Agriculture",
      risk: "High Risk",
      minInvestment: "₦250,000",
      rating: "4.6 (234 investors)",
      tagColor: "bg-red-100 text-red-700",
    },
    {
      title: "Lagos Real Estate",
      company: "Sterling Properties",
      roi: "25–30%",
      duration: "24 months",
      category: "Technology",
      risk: "Medium Risk",
      minInvestment: "₦250,000",
      rating: "4.6 (234 investors)",
      tagColor: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Lagos Real Estate",
      company: "Sterling Properties",
      roi: "18–22%",
      duration: "24 months",
      category: "Real Estate",
      risk: "Low Risk",
      minInvestment: "₦250,000",
      rating: "4.6 (234 investors)",
      tagColor: "bg-emerald-100 text-emerald-700",
    },
  ];

  const getUser = async () => {
    try {
      const res = await axios("/users/profile", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
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
    } finally {
      setLoading(false); // ✅ Stop loading after request completes
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const isPartner = accountType === "partner";
  const router = useRouter();

  return (
    <Dashboardlayouts>
      <Head>
        <title>FinTribe || Opportunities</title>
      </Head>

      <div className="w-full h-full px-5 py-8 overflow-y-auto flex flex-col gap-6">
        {/* ✅ Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
            <TbFidgetSpinner className="animate-spin text-4xl mb-3 text-[#001F3F]" />
            <p className="text-sm">Loading opportunities...</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between w-full">
              <div>
                <h2 className="text-xl font-semibold">
                  Investment Opportunities
                </h2>
                <p className="text-sm text-gray-500">
                  Discover vetted opportunities from verified partners
                </p>
              </div>

              {isPartner && (
                <button
                  onClick={() =>
                    router.push("/dashboard/opportunities/stepone")
                  }
                  className="flex items-center gap-2 bg-[#001F3F] text-white text-sm px-4 py-2 rounded-md hover:bg-[#003366] transition"
                >
                  Create Opportunity <Plus className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Summary (only for partners) */}
            {isPartner && (
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {summary.map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex-1 min-w-[150px] bg-[#84C2A229] p-5 rounded-xl shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-[#2E8B57] text-xl font-bold">
                        {stat.count}
                      </div>
                      <p className="text-2xl font-medium text-[#2E8B57]">
                        {stat.icon}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 pl-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Search + Filters */}
            <div className="flex flex-col justify-between md:flex-row items-center gap-3 md:gap-4 w-full">
              <div className="flex items-center w-full md:w-[40%] bg-white border border-gray-200 rounded-lg px-3 py-2">
                <Search className="text-gray-400 w-4 h-4 mr-2" />
                <input
                  type="text"
                  placeholder="Search opportunities..."
                  className="w-full outline-none text-sm"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-[40%]">
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2 w-1/2 cursor-pointer">
                  <span className="text-sm text-gray-600">All Categories</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2 w-1/2 cursor-pointer">
                  <span className="text-sm text-gray-600">Filter by</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Cards */}
            <div
              className={`${
                isPartner
                  ? "grid grid-cols-1"
                  : "grid grid-cols-1 sm:grid-cols-2"
              } gap-5 w-full`}
            >
              {opportunities.map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-xs text-gray-500">{item.company}</p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${item.tagColor}`}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Expected ROI</p>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.roi}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Duration</p>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.duration}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`flex justify-between items-center mt-3 ${item.tagColor} px-3 py-1 rounded-full w-max`}
                  >
                    <span className="text-xs text-gray-500">{item.risk}</span>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-1">
                      ⭐ {item.rating}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      Min. Investment:{" "}
                      <span className="font-semibold">
                        {item.minInvestment}
                      </span>
                    </p>

                    <button className="w-full bg-[#001F3F] text-white text-sm py-2 rounded-md hover:bg-[#003366] transition">
                      View details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Dashboardlayouts>
  );
};

export default Opportunities;
