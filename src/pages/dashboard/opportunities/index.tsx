/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  ChartColumnBig,
  Trash,
  ShieldCheck,
  Notebook,
  Lock,
} from "lucide-react";
import Dashboardlayouts from "../../layouts/Dashboardlayouts";
import Head from "next/head";
import axios from "@/config/axiosconfig";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useRouter } from "next/router";
import Image from "next/image";

const Opportunities = () => {
  type Opportunity = {
    _id: string;
    title: string;
    category: string;
    expectedROI: number;
    roiTimeline: {
      timelineMonths: number;
    };
    minInvestment?: number | string;
    status: string;
  };

  const [accountType, setAccountType] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [singleLoading, setSingleLoading] = useState(false);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [allOpportunities, setAllOpportunities] = useState<Opportunity[]>([]);
  type SummaryStat = { label: string; count: number; icon: React.ReactNode };
  const [summary, setsummary] = useState<SummaryStat[]>([]);

  const [opportunityToDelete, setOpportunityToDelete] = useState<string | null>(
    null
  );

  const getUser = async () => {
    try {
      const res = await axios("/users/profile", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      const type = res.data.content.user.account_type;
      console.log(type, "confirm if this correct...");
      setAccountType(type);
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
      setLoading(false);
    }
  };

  const getAllOpportunities = async () => {
    setLoading(true);

    try {
      const url =
        accountType === "partner"
          ? "/opportunity/me?page=1&limit=5"
          : "/opportunity/all?page=1&limit=5";

      const res = await axios.get(url, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });

      const mapped = res.data.content.opportunities.map((item: any) => ({
        _id: item._id,
        title: item.title,
        category: item.category,
        expectedROI: item.expectedROI,
        investmentDuration: item.investmentDuration,
        minInvestmentAmount: item.minInvestmentAmount
          ? Number(item.minInvestmentAmount).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "Not specified",
        status: item.status || "inactive",
        currency: item.currency,
      }));

      const m = res.data.content.metrics;

      setsummary([
        {
          label: "Total Opportunities",
          count: m.total,
          icon: <ChartColumnBig size={24} />,
        },
        {
          label: "Active Opportunities",
          count: m.active,
          icon: <Plus size={24} />,
        },
        {
          label: "Draft Opportunities",
          count: m.draft,
          icon: <Notebook size={24} />,
        },
        {
          label: "Closed Opportunities",
          count: m.closed,
          icon: <Lock size={24} />,
        },
      ]);
      setAllOpportunities(mapped);

      setOpportunities(mapped);
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
      setLoading(false);
    }
  };

  const getSingleOpportunities = async (opportunityId: string) => {
    try {
      setSingleLoading(true);
      const res = await axios.get(`/opportunity/${opportunityId}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      setSelectedOpportunity(res.data.content); // store the data
      setShowModal(true); // open the modal
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
      setSingleLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (accountType) {
      getAllOpportunities();
    }
  }, [accountType]);

  const isPartner = accountType === "partner";
  const router = useRouter();

  const handleDeleteOpportunity = async () => {
    if (!opportunityToDelete) return;

    try {
      const res = await axios.delete(`/opportunity/${opportunityToDelete}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      toast.success(res.data.message);
      getAllOpportunities();
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
      setDeleteModalOpen(false);
      setOpportunityToDelete(null);
    }
  };

  const dataToRender = isPartner ? opportunities : allOpportunities;

  console.log("this is what is rendering:", allOpportunities);

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
                    router.push("/dashboard/opportunities/connect")
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
              {dataToRender.map((item: any, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 shadow-md rounded-xl p-6 hover:shadow-lg transition-all flex flex-col gap-5"
                >
                  {/* Top Section */}
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <ShieldCheck className="text-emerald-600" size={16} />
                        <span
                          className={`py-1 px-3 text-xs rounded-full ${
                            item.status === "active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <span className="py-1 px-3 bg-[#17A2B815] text-[#17A2B8] text-xs rounded-full w-max">
                        {item.category}
                      </span>
                    </div>

                    {/* Delete Button */}
                    {isPartner && (
                      <span
                        onClick={() => {
                          setOpportunityToDelete(item._id);
                          setDeleteModalOpen(true);
                        }}
                        className="text-red-600 cursor-pointer hover:scale-110 transition"
                      >
                        <Trash size={18} />
                      </span>
                    )}
                  </div>
                  {/* ROI + Duration + Min Investment (VERTICAL LAYOUT) */}
                  <div className="w-full flex justify-around items-center  text-black rounded-lg p-4 gap-4">
                    {/* Min Investment */}
                    <div className="flex flex-col">
                      <p className="text-xs opacity-80">Min. Investment</p>
                      <h3 className="text-lg font-bold">
                        {item.currency} {item.minInvestmentAmount}
                      </h3>
                    </div>

                    {/* Duration */}
                    <div className="flex flex-col">
                      <p className="text-xs opacity-80">Duration</p>
                      <h3 className="text-base font-semibold">
                        {item.investmentDuration}
                      </h3>
                    </div>

                    {/* Expected ROI */}
                    <div className="flex flex-col">
                      <p className="text-xs opacity-80">Expected ROI</p>
                      <h3 className="text-base font-semibold text-emerald-300">
                        {item.expectedROI}%
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    {/* VIEW DETAILS (Always Visible) */}
                    <button
                      onClick={() => getSingleOpportunities(item._id)}
                      className="flex-1 bg-[#001F3F] text-white text-sm py-2 rounded-md hover:bg-[#003366] transition"
                    >
                      View details
                    </button>

                    {/* ONLY SHOW THESE IF PARTNER */}
                    {isPartner && (
                      <>
                        <button className="flex-1 border border-[#0A2540] text-[#0A2540] text-sm py-2 rounded-md hover:bg-yellow-600 transition">
                          Edit
                        </button>

                        {item.status === "active" && (
                          <button className="flex-1 bg-red-600 text-white text-sm py-2 rounded-md hover:bg-red-700 transition">
                            Close
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-lg relative max-h-[90vh] flex flex-col">
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10"
              >
                ✕
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-8 pt-12 flex-1">
                {singleLoading ? (
                  <div className="flex flex-col items-center py-12">
                    <TbFidgetSpinner className="animate-spin text-3xl text-[#001F3F]" />
                    <p className="text-sm mt-3 text-gray-600">
                      Loading details...
                    </p>
                  </div>
                ) : (
                  selectedOpportunity && (
                    <div className="flex flex-col gap-6">
                      {/* TITLE */}
                      <h2 className="text-2xl font-semibold mt-2">
                        {selectedOpportunity.title}
                      </h2>

                      {/* CATEGORY */}
                      <p className="text-sm text-gray-600">
                        {selectedOpportunity.category}
                      </p>

                      {/* IMAGE */}
                      {selectedOpportunity.media?.length > 0 && (
                        <Image
                          src={selectedOpportunity.media[0].url}
                          alt="Opportunity"
                          width={600}
                          height={300}
                          className="object-cover rounded-lg mt-3 mb-4 w-full"
                        />
                      )}

                      {/* BASIC INFO */}
                      <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
                        <p>
                          <strong>ROI:</strong>{" "}
                          {selectedOpportunity.expectedROI}%
                        </p>
                        <p>
                          <strong>Status:</strong> {selectedOpportunity.status}
                        </p>
                        <p>
                          <strong>Currency:</strong>{" "}
                          {selectedOpportunity.currency}
                        </p>
                        <p>
                          <strong>Location:</strong>{" "}
                          {selectedOpportunity.location}
                        </p>
                        <p>
                          <strong>Duration:</strong>{" "}
                          {selectedOpportunity.roiTimeline?.timelineMonths}{" "}
                          months
                        </p>
                        <p>
                          <strong>Closing Date:</strong>{" "}
                          {new Date(
                            selectedOpportunity.closingDate
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      {/* DESCRIPTION */}
                      <div className="mt-2">
                        <h3 className="font-medium mb-1">Description</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {selectedOpportunity.description}
                        </p>
                      </div>

                      {/* DUE DILIGENCE */}
                      <div className="mt-1">
                        <h3 className="font-medium mb-1">Due Diligence</h3>
                        <ul className="list-disc ml-6 text-sm space-y-1">
                          {selectedOpportunity.dueDiligence?.map(
                            (item: string, idx: number) => (
                              <li key={idx}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* KEY HIGHLIGHTS */}
                      <div className="mt-1">
                        <h3 className="font-medium mb-1">Key Highlights</h3>
                        <ul className="list-disc ml-6 text-sm space-y-1">
                          {selectedOpportunity.keyHighlights?.map(
                            (item: string, idx: number) => (
                              <li key={idx}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* RISK FACTORS */}
                      <div className="mt-1 mb-3">
                        <h3 className="font-medium mb-1">Risk Factors</h3>
                        <ul className="list-disc ml-6 text-sm space-y-1">
                          {selectedOpportunity.riskFactors?.map(
                            (item: string, idx: number) => (
                              <li key={idx}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
        {/* Delete Confirmation Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete this opportunity? This action
                cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteOpportunity}
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Dashboardlayouts>
  );
};

export default Opportunities;
