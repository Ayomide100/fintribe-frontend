import axios from "@/config/axiosconfig";
import { isAxiosError } from "axios";
import { CircleCheck, TriangleAlert } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import toast from "react-hot-toast";

interface Opportunity {
  _id: string;
  title: string;
  category: string;
  expectedROI: number;
  dueDiligence: string[];
  keyHighlights: string[];
  riskFactors: string[];
  currency: string;
  location: string;
  closingDate: string;
  description: string;
  media: { url: string; id: string; _id: string }[];
}

const FinalStep = () => {
  const id = "691300329366e6719a88c8d9";
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);

  const getSingleOpportunity = async () => {
    try {
      const response = await axios.get(`/opportunity/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setOpportunity(response.data.content);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "An unexpected error occurred";
        toast.error(message);
      } else {
        toast.error("Error occurred");
      }
    }
  };

  useEffect(() => {
    getSingleOpportunity();
  }, []);

  // ROI Chart Data
  const chartData = useMemo(() => {
    const months = Array.from({ length: 25 }, (_, i) => i);
    const minROI = months.map((m) => parseFloat(((m / 24) * 30).toFixed(2)));
    const maxROI = months.map((m) => parseFloat(((m / 24) * 45).toFixed(2)));

    return {
      labels: months.map((m) => (m % 3 === 0 ? `${m}` : "")),
      datasets: [
        {
          label: "Max ROI (45%)",
          data: maxROI,
          borderWidth: 2,
          tension: 0.25,
          fill: "+1",
          pointRadius: 3,
        },
        {
          label: "Min ROI (30%)",
          data: minROI,
          borderWidth: 2,
          tension: 0.25,
          fill: false,
          pointRadius: 3,
        },
        {
          label: "Projected ROI Range",
          data: maxROI.map((v, i) => v - minROI[i]),
          backgroundColor: "rgba(34,197,94,0.12)",
          borderWidth: 0,
          pointRadius: 0,
          fill: true,
        },
      ],
    };
  }, []);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" as const },
        title: {
          display: true,
          text: "Projected ROI Timeline (24 Months)",
          font: { size: 14 },
        },
      },
      scales: {
        x: { title: { display: true, text: "Months" } },
        y: { title: { display: true, text: "ROI (%)" }, min: 0, max: 50 },
      },
    }),
    []
  );

  if (!opportunity) return <p className="text-center">Loading...</p>;
  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md font-sans">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{opportunity.title}</h1>
          <span className="text-xs text-gray-700 bg-green-100 px-2 py-1 rounded">
            {opportunity.category}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Left Column: Project Overview & Gallery */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Project Overview</h2>
          <p className="text-gray-700 mb-4 text-justify">
            {opportunity.description}
          </p>

          <h3 className="text-md font-semibold mb-2">Project Gallery</h3>
          <div className="grid grid-cols-2 gap-2">
            {opportunity.media.length > 0 ? (
              opportunity.media.map((m) => (
                <Image
                  key={m._id}
                  src={m.url}
                  alt={opportunity.title}
                  height={300}
                  width={300}
                  className="rounded-md object-cover"
                />
              ))
            ) : (
              <p className="text-sm text-gray-500">No media uploaded</p>
            )}
          </div>
        </div>

        {/* Right Column: Info Card */}
        <div className="bg-gray-100 p-4 rounded-lg flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="font-semibold">Expected ROI:</span>
            <span className="text-green-600 font-bold">
              {opportunity.expectedROI}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Location:</span>
            <span className="text-blue-500">{opportunity.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Closing Date:</span>
            <span className="text-orange-500 font-bold">
              {new Date(opportunity.closingDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">Key Highlights</h3>
        {opportunity.keyHighlights.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {opportunity.keyHighlights.map((highlight, i) => (
              <li key={i} className="flex items-center">
                <span className="text-green-500 mr-2">●</span>
                {highlight}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No highlights available</p>
        )}
      </div>

      <div className="bg-white border rounded-md p-6 shadow-sm mt-6">
        <h3 className="font-semibold mb-1">ROI & Risk Analysis</h3>
        <p className="text-xs text-gray-500 mb-4">Projected ROI Timeline</p>
        <div style={{ height: 320 }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Risk Factors + Due Diligence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
        {/* Risk Factors */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Risk Factors</h4>
          {opportunity.riskFactors.length > 0 ? (
            <ul className="text-sm text-gray-700 space-y-1">
              {opportunity.riskFactors.map((risk, i) => (
                <li key={i}>
                  <span className="text-yellow-400 mr-1">
                    <TriangleAlert />
                  </span>
                  {risk}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No risks listed</p>
          )}
        </div>

        {/* Due Diligence */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Due Diligence</h4>
          {opportunity.dueDiligence.length > 0 ? (
            <ul className="text-sm text-gray-700 space-y-1">
              {opportunity.dueDiligence.map((item, i) => (
                <li
                  key={i}
                  className="px-5 py-2 bg-[#84C2A229] flex items-center rounded-md"
                >
                  <span className="text-green-400  mr-1">
                    <CircleCheck />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No due diligence details</p>
          )}
        </div>
      </div>

      {/* Before You Publish Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3 mt-3">
        {/* Icon */}
        <div className="shrink-0">
          <svg
            className="w-6 h-6 text-yellow-500 mt-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-[#FFCC00] font-semibold mb-1">
            Before You Publish
          </h3>
          <p className="text-[#FFCC00] text-sm leading-relaxed">
            Make sure all information is accurate and complete. Once published,
            your opportunity will be visible to all investors on the platform.
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button className="bg-blue-900 text-white px-6 py-2 rounded shadow hover:bg-blue-800">
          Publish Opportunity
        </button>
        <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded shadow hover:bg-gray-300">
          Save as Draft
        </button>
      </div>
    </div>
  );
};

export default FinalStep;
