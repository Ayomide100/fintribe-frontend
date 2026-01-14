/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Dashboardlayouts from "../layouts/Dashboardlayouts";
import Head from "next/head";
import { Search, Filter, Bookmark, TrendingUp, ScrollText } from "lucide-react";
import { TbFidgetSpinner } from "react-icons/tb";
import axios from "@/config/axiosconfig";
import Image from "next/image";

const SavedItems = () => {
  const [items, setItems] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<string>("");

  const getSavedItems = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`/saved/all?page=1&limit=10&type=${type}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const content = res.data?.content;

      // ✅ saved items
      setItems(content?.items || []);

      // ✅ metrics
      setMetrics(content?.metrics || null);
    } catch (error) {
      console.error("Failed to fetch saved items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSavedItems();
  }, [type]);

  const summaryCards = metrics
    ? [
        {
          label: "Total Saved",
          count: metrics.totalSaved,
          icon: <Bookmark size={24} />,
        },
        {
          label: "Posts",
          count: metrics.totalSavedPosts,
          icon: <ScrollText size={24} />,
        },
        {
          label: "Opportunities",
          count: metrics.totalSavedOpportunity,
          icon: <TrendingUp size={24} />,
        },
        {
          label: "Circles",
          count: metrics.totalSavedCircle,
          icon: <TbFidgetSpinner size={24} />,
        },
      ]
    : [];

  return (
    <Dashboardlayouts>
      <Head>
        <title>FinTribe || Saved Items</title>
      </Head>

      <div className="p-6 space-y-8">
        {/* ================= SUMMARY METRICS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {summaryCards.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#84C2A229] p-5 rounded-xl flex flex-col gap-2"
            >
              <div className="text-[#2E8B57]">{stat.icon}</div>
              <p className="text-2xl font-semibold text-[#2E8B57]">
                {stat.count}
              </p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ================= SEARCH + FILTER ================= */}
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
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
            >
              <option value="">All Saved</option>
              <option value="Post">Posts</option>
              <option value="Opportunity">Opportunities</option>
              <option value="Circle">Circles</option>
              <option value="Course">Courses</option>
            </select>

            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* ================= SAVED ITEMS ================= */}
        {loading ? (
          <p className="text-center text-gray-500">Loading saved items...</p>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 bg-white border border-dashed border-gray-300 rounded-xl text-center">
            {/* Icon */}
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-50 mb-4">
              <Bookmark className="w-8 h-8 text-green-600" />
            </div>

            {/* Text */}
            <h3 className="text-lg font-semibold text-gray-800">
              No saved items yet
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mt-2">
              You haven’t saved any posts, opportunities, circles, or courses
              yet. Start exploring and bookmark what matters to you.
            </p>

            {/* CTA */}
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="mt-6 px-5 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
            >
              Explore content
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {items.map((saved) => {
              const item = saved.itemId;

              return (
                <div
                  key={saved._id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-4"
                >
                  {/* Type + Date */}
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 text-xs rounded-full bg-green-50 text-green-800 font-medium">
                      {saved.type}
                    </span>
                    <span className="text-xs text-gray-400">
                      Saved {new Date(saved.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* User (for posts) */}
                  {item?.user && (
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.user.avatar?.url}
                        alt={item.user.fullname}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <p className="text-sm font-medium text-gray-800">
                        {item.user.fullname}
                      </p>
                    </div>
                  )}

                  {/* Content */}
                  <p className="text-gray-700 text-sm">
                    {item?.content || item?.description || "No content"}
                  </p>

                  {/* Media (posts) */}
                  {item?.media?.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {item.media.map((img: any, idx: number) => (
                        <Image
                          key={idx}
                          src={img.url}
                          alt="media"
                          width={40}
                          height={40}
                          className="rounded-lg object-cover h-32 w-full"
                        />
                      ))}
                    </div>
                  )}

                  <button className="w-full mt-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition">
                    View
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Dashboardlayouts>
  );
};

export default SavedItems;
