/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "@/config/axiosconfig";
import { isAxiosError } from "axios";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
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

interface FinalStepProps {
  formData: Record<string, any>;
  onBack: () => void;
}

const FinalStep: React.FC<FinalStepProps> = ({ onBack }) => {
  const id = localStorage.getItem("opportunityId");
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [status, setStatus] = useState("published");

  // ✅ Fetch Opportunity for Review
  const getSingleOpportunity = async () => {
    try {
      const response = await axios.get(`/opportunity/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setOpportunity(response.data.content);

      setStatus(status);
      console.log("this is teh status of the opporunity:", status);
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

  // ✅ Handle Publish Opportunity
  const handlePublish = async () => {
    const toastId = toast.loading("Publishing opportunity...");

    try {
      const res = await axios.put(
        `/opportunity/${id}/publish`,
        { status }, // <-- pass all form data here
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);

      toast.dismiss(toastId);
      toast.success("Opportunity published successfully!");
      setShowSuccessModal(true); // ✅ show modal
    } catch (error: unknown) {
      toast.dismiss(toastId);
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

  const router = useRouter();

  const handleModalAction = () => {
    setShowSuccessModal(false);
    router.push("/dashboard/opportunities");
  };

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
    <div className="relative max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md font-sans">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{opportunity.title}</h1>
          <span className="text-xs text-gray-700 bg-green-100 px-2 py-1 rounded">
            {opportunity.category}
          </span>
        </div>
      </div>

      {/* Project Overview + Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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

      <div className="bg-white border rounded-md p-6 shadow-sm mt-6">
        <h3 className="font-semibold mb-1">ROI & Risk Analysis</h3>
        <div style={{ height: 320 }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Publish & Back */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded shadow hover:bg-gray-300"
        >
          Back
        </button>

        <button
          onClick={handlePublish}
          className="bg-blue-900 text-white px-6 py-2 rounded shadow hover:bg-blue-800"
        >
          Publish Opportunity
        </button>
      </div>

      {/* ✅ Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[400px] text-center">
            <CircleCheck className="text-green-500 mx-auto mb-3" size={48} />
            <h2 className="text-xl font-semibold mb-2">
              Published Successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              Your opportunity is now live and visible to investors 🎉
            </p>
            <button
              onClick={handleModalAction}
              className="bg-green-600 text-white px-6 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalStep;
