"use client";
import React from "react";
import Dashboardlayouts from "../layouts/Dashboardlayouts";
import Head from "next/head";
import {
  Search,
  Filter,
  Bookmark,
  TrendingUp,
  GraduationCap,
  ScrollText,
} from "lucide-react";
import { TbFidgetSpinner } from "react-icons/tb";

const SavedItems = () => {
  const summary = [
    { label: "Total Saved", count: 12, icon: <Bookmark size={25} /> },
    { label: "Opportunities", count: 3, icon: <TrendingUp size={25} /> },
    { label: "Circles", count: 1, icon: <TbFidgetSpinner size={25} /> },
    { label: "Courses", count: 4, icon: <GraduationCap size={25} /> },
    { label: "Posts", count: 4, icon: <ScrollText size={25} /> },
  ];

  const items = [
    {
      type: "Opportunity",
      category: "Real Estate",
      title: "Lagos Real Estate",
      sub: "35 Startup Properties",
      extra: "24 months Duration",
      stat: "18–22% Expected ROI",
      meta: "Min. Investment: ₦250,000",
      saved: "31/01/2024",
      rating: "⭐ 4.6 (243 Investors)",
    },
    {
      type: "Circle",
      title: "Young NG Investors circle",
      sub: "Members: 350",
      desc: "A community of beginner-to-intermediate investors sharing daily stock tips and strategies.",
      saved: "30/01/2024",
    },
    {
      type: "Course",
      title: "Investment Fundamentals",
      sub: "By Sarah Owolumate",
      desc: "Learn the basics of investing, risk management, and portfolio diversification.",
      meta: "2 hours · 12 lessons",
      rating: "⭐ 4.6 (234 learners)",
      saved: "31/01/2024",
    },
    {
      type: "Post",
      title: "Adebimpe Thompson",
      sub: "Real Estate Expert · 10min ago",
      desc: "The Nigerian real estate market is showing strong fundamentals despite global uncertainties...",
      saved: "31/01/2024",
    },
  ];

  return (
    <Dashboardlayouts>
      <Head>
        <title>FinTribe || Saved Items</title>
      </Head>

      <div className="p-6 space-y-8">
        {/* Summary */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {summary.map((stat, idx) => (
            <div
              key={idx}
              className="flex-1 min-w-[150px] bg-[#84C2A229] p-5 rounded-xl shadow-sm flex flex-col items-start"
            >
              <div className="mb-2 text-[#2E8B57]">{stat.icon}</div>
              <p className="text-xl font-semibold text-[#2E8B57]">
                {stat.count}
              </p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your saved items..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-600 focus:outline-none">
              <option>All Saved</option>
              <option>Opportunities</option>
              <option>Circles</option>
              <option>Courses</option>
              <option>Posts</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-5 space-y-3"
            >
              {/* Type Badge */}
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 text-xs rounded-full bg-green-50 text-green-800 font-medium">
                  {item.type}
                </span>
                <span className="text-xs text-gray-400">
                  Saved {item.saved}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                {item.sub && (
                  <p className="text-sm text-gray-500">{item.sub}</p>
                )}
              </div>

              {/* Description / Stats */}
              {item.desc && (
                <p className="text-sm text-gray-600">{item.desc}</p>
              )}
              {item.stat && (
                <p className="text-sm font-semibold text-green-700">
                  {item.stat}
                </p>
              )}
              {item.extra && (
                <p className="text-xs text-gray-500">{item.extra}</p>
              )}
              {item.meta && (
                <p className="text-xs text-gray-500">{item.meta}</p>
              )}
              {item.rating && (
                <p className="text-xs text-yellow-600">{item.rating}</p>
              )}

              {/* Action */}
              <button className="px-4 py-2 mt-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </Dashboardlayouts>
  );
};

export default SavedItems;
