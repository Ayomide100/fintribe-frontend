/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Dashboardlayouts from "../layouts/Dashboardlayouts";
import Head from "next/head";
import {
  Search,
  Bookmark,
  TrendingUp,
  ScrollText,
  X,
  Eye,
  Trash2,
  Users,
} from "lucide-react";
import { TbFidgetSpinner } from "react-icons/tb";
import axios from "@/config/axiosconfig";
import Image from "next/image";

const SavedItems = () => {
  const [items, setItems] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSaved, setSelectedSaved] = useState<any>(null);

  const handleDelete = async (savedId: string) => {
    try {
      await axios.delete(`/saved/${savedId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      // remove from UI instantly
      setItems((prev) => prev.filter((item) => item._id !== savedId));
    } catch (error) {
      console.error("Failed to delete saved item", error);
    }
  };

  const handleView = (saved: any) => {
    setSelectedSaved(saved);
    setIsModalOpen(true);
  };

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

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.itemId?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemId?.content?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

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
      </div>
      <div className="min-h-screen bg-gray-50 p-6  ">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your saved items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
                />
              </div>

              <div className="flex gap-3">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white min-w-[140px]"
                >
                  <option value="">All Saved</option>
                  <option value="Post">Posts</option>
                  <option value="Opportunity">Opportunities</option>
                  <option value="Circle">Circles</option>
                  <option value="Course">Courses</option>
                </select>

                <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition whitespace-nowrap">
                  Filter by
                </button>
              </div>
            </div>
          </div>

          {/* Saved Items Grid */}
          {loading ? (
            <div className="text-center py-20 text-gray-500">
              Loading saved items...
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 bg-white border border-gray-200 rounded-xl text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-50 mb-4">
                <Bookmark className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                No saved items yet
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mt-2">
                You haven&#39;t saved any posts, opportunities, circles, or
                courses yet. Start exploring and bookmark what matters to you.
              </p>
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="mt-6 px-5 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
              >
                Explore content
              </button>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-4 h-[65vh] overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6 h-full overflow-y-auto pr-2">
                {filteredItems.map((saved) => {
                  const item = saved.itemId;

                  return (
                    <div
                      key={saved._id}
                      className="
    bg-white border border-gray-200 rounded-xl p-6
    hover:shadow-md transition-shadow
    min-h-[360px]
    flex flex-col justify-between
  "
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700 flex items-center gap-1.5">
                          {saved.type === "Opportunity" && "🚀"}
                          {saved.type === "Circle" && "👥"}
                          {saved.type === "Course" && "🎓"}
                          {saved.type === "Post" && "📝"}
                          {saved.type}
                        </span>

                        <button
                          onClick={() => handleDelete(saved._id)}
                          className="text-gray-400 hover:text-red-500 transition p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        {/* Opportunity */}
                        {saved.type === "Opportunity" && (
                          <>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                                  {item?.title}
                                  <span className="text-green-600">✓</span>
                                </h3>
                                {item?.createdBy && (
                                  <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                                    <span>🏢</span>
                                    {item.createdBy.fullname}
                                  </p>
                                )}
                              </div>
                              {item?.category && (
                                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md whitespace-nowrap">
                                  {item.category}
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 py-3">
                              <div>
                                <p className="text-2xl font-bold text-green-600">
                                  {item?.expectedROI}%
                                </p>
                                <p className="text-xs text-gray-500">
                                  Expected ROI
                                </p>
                              </div>
                              <div>
                                <p className="text-2xl font-bold text-gray-900">
                                  {item?.investmentDuration}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Duration
                                </p>
                              </div>
                            </div>

                            {item?.description && (
                              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                {item.description}
                              </p>
                            )}

                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                              <p className="text-sm text-gray-600">
                                Min. Investment:{" "}
                                <span className="font-semibold">
                                  ₦{item?.minInvestmentAmount?.toLocaleString()}
                                </span>
                              </p>
                              {item?.status && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full capitalize">
                                  {item.status}
                                </span>
                              )}
                            </div>

                            {/* {item?.media && item.media.length > 0 && (
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                {item.media
                                  .slice(0, 2)
                                  .map((img: any, idx: number) => (
                                    <Image
                                      key={idx}
                                      src={img.url}
                                      alt="opportunity"
                                      width={150}
                                      height={150}
                                      className="rounded-lg object-cover h-28 w-full"
                                    />
                                  ))}
                              </div>
                            )} */}
                          </>
                        )}

                        {/* Circle */}
                        {saved.type === "Circle" && (
                          <>
                            <div className="flex items-start gap-3">
                              {item?.icon?.url ? (
                                <Image
                                  src={item.icon.url}
                                  alt={item.name}
                                  width={56}
                                  height={56}
                                  className="rounded-full object-cover shrink-0"
                                />
                              ) : (
                                <div className="w-14 h-14 rounded-full bg-linear-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
                                  {item?.name?.charAt(0) || "C"}
                                </div>
                              )}
                              <div className="flex-1">
                                <h3 className="text-base font-semibold text-gray-900">
                                  {item?.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  Members • {item?.members?.length || 0} •
                                  <span
                                    className={`ml-1 ${item?.type === "public" ? "text-green-600" : "text-orange-600"}`}
                                  >
                                    {item?.type === "public" ? "🌐" : "🔒"}
                                  </span>
                                </p>
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                              {item?.description}
                            </p>

                            {item?.accessFee && item.accessFee.amount > 0 && (
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-600">
                                  Access Fee:
                                </span>
                                <span className="font-semibold text-gray-900">
                                  {item.accessFee.currency}{" "}
                                  {item.accessFee.amount.toLocaleString()}
                                </span>
                              </div>
                            )}
                          </>
                        )}

                        {/* Course */}
                        {saved.type === "Course" && (
                          <>
                            <div>
                              <h3 className="text-base font-semibold text-gray-900">
                                {item?.title || item?.name}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                by{" "}
                                {item?.instructor ||
                                  item?.author ||
                                  "Instructor"}
                              </p>
                            </div>

                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                              {item?.content || item?.description}
                            </p>

                            {item?.media && item.media.length > 0 && (
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                {item.media
                                  .slice(0, 2)
                                  .map((img: any, idx: number) => (
                                    <Image
                                      key={idx}
                                      src={img.url}
                                      alt="course"
                                      width={150}
                                      height={150}
                                      className="rounded-lg object-cover h-28 w-full"
                                    />
                                  ))}
                              </div>
                            )}
                          </>
                        )}

                        {/* Post */}
                        {saved.type === "Post" && item?.user && (
                          <>
                            <div className="flex items-center gap-3">
                              {item.user.avatar?.url ? (
                                <Image
                                  src={item.user.avatar.url}
                                  alt={item.user.fullname}
                                  width={40}
                                  height={40}
                                  className="rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-semibold">
                                  {item.user.fullname?.charAt(0) || "U"}
                                </div>
                              )}

                              <div>
                                <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
                                  {item.user.fullname}
                                  <span className="text-green-600">✓</span>
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(item.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    },
                                  )}
                                </p>
                              </div>
                            </div>

                            <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
                              {item?.content}
                            </p>

                            {/* {item?.likes && item.likes.length > 0 && (
                              <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
                                <span>❤️ {item.likes.length}</span>
                                {item?.comments && (
                                  <span>💬 {item.comments.length}</span>
                                )}
                              </div>
                            )} */}
                          </>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-400">
                          Saved{" "}
                          {new Date(saved.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "numeric",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </p>
                        <button
                          onClick={() => handleView(saved)}
                          className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-700 text-sm rounded-lg hover:bg-green-50 transition"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedSaved && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block px-3 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full mb-4">
              {selectedSaved.type}
            </span>

            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {selectedSaved.itemId?.title ||
                selectedSaved.itemId?.name ||
                "Saved Item"}
            </h2>

            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {selectedSaved.itemId?.content ||
                selectedSaved.itemId?.description}
            </p>

            {selectedSaved.itemId?.media &&
              selectedSaved.itemId.media.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {selectedSaved.itemId.media.map((img: any, idx: number) => (
                    <Image
                      key={idx}
                      src={img.url}
                      alt="media"
                      width={200}
                      height={200}
                      className="rounded-lg object-cover w-full h-48"
                    />
                  ))}
                </div>
              )}

            {/* Additional Info for Opportunities */}
            {selectedSaved.type === "Opportunity" && selectedSaved.itemId && (
              <div className="mt-6 space-y-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Expected ROI</p>
                    <p className="text-lg font-bold text-green-600">
                      {selectedSaved.itemId.expectedROI}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedSaved.itemId.investmentDuration}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Min. Investment</p>
                    <p className="text-lg font-bold text-gray-900">
                      ₦
                      {selectedSaved.itemId.minInvestmentAmount?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedSaved.itemId.location}
                    </p>
                  </div>
                </div>

                {selectedSaved.itemId.keyHighlights &&
                  selectedSaved.itemId.keyHighlights.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">
                        Key Highlights
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedSaved.itemId.keyHighlights.map(
                          (highlight: string, idx: number) => (
                            <li key={idx} className="text-sm text-gray-700">
                              {highlight}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                {selectedSaved.itemId.riskFactors &&
                  selectedSaved.itemId.riskFactors.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">
                        Risk Factors
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedSaved.itemId.riskFactors.map(
                          (risk: string, idx: number) => (
                            <li key={idx} className="text-sm text-gray-700">
                              {risk}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            )}

            {/* Additional Info for Posts */}
            {selectedSaved.type === "Post" && selectedSaved.itemId?.user && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  {selectedSaved.itemId.user.avatar?.url ? (
                    <Image
                      src={selectedSaved.itemId.user.avatar.url}
                      alt={selectedSaved.itemId.user.fullname}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
                      {selectedSaved.itemId.user.fullname?.charAt(0) || "U"}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {selectedSaved.itemId.user.fullname}
                    </p>
                    <p className="text-sm text-gray-500">
                      Posted on{" "}
                      {new Date(
                        selectedSaved.itemId.createdAt,
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Dashboardlayouts>
  );
};

export default SavedItems;
