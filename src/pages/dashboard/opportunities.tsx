import React from "react";
import { Search, ChevronDown } from "lucide-react";
import Dashboardlayouts from "../layouts/Dashboardlayouts";
import Head from "next/head";

const Opportunities = () => {
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

  return (
    <Dashboardlayouts>
      <Head>
        <title>FinTribe || Opportunities</title>
      </Head>

      <div className="w-full h-full px-5 py-8 overflow-y-auto flex flex-col gap-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold">Investment Opportunities</h2>
          <p className="text-sm text-gray-500">
            Discover vetted opportunities from verified partners
          </p>
        </div>

        {/* Search + Filter Section */}
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

        {/* Cards Section (2 top, 2 bottom) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
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
                <p className="text-xs text-gray-500 mb-1">⭐ {item.rating}</p>
                <p className="text-xs text-gray-500 mb-3">
                  Min. Investment:{" "}
                  <span className="font-semibold">{item.minInvestment}</span>
                </p>

                <button className="w-full bg-[#001F3F] text-white text-sm py-2 rounded-md hover:bg-[#003366] transition">
                  View details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dashboardlayouts>
  );
};

export default Opportunities;
