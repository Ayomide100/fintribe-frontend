/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "@/config/axiosconfig";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

interface InputFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  required,
  children,
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
  </div>
);

interface OpportunityFormProps {
  onNext: (data: any, id?: string) => void;
  existingId?: string | null;
}

const OpportunityForm: React.FC<OpportunityFormProps> = ({ onNext }) => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    investmentType: "",
    expectedROI: 0,
    minimumInvestment: "",
    currency: "NGN",
    closingDate: "",
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onChange =
    (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async () => {
    const toastId = toast.loading("Submitting basic info...");
    try {
      const res = await axios.post(
        "/opportunity/basic-info",
        JSON.stringify(form),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Basic information submitted!");
      const id = res.data?.content?._id;

      if (id) localStorage.setItem("opportunityId", id);

      onNext(form, id);
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
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  // ROI Chart
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

  return (
    <div className="px-5 mt-1">
      <h2 className="text-lg font-semibold mb-2">Create Opportunity</h2>
      <p className="text-sm text-gray-500 mb-4">
        Share your investment opportunity with the Fintribe community
      </p>

      {/* BASIC INFO */}
      <div className="bg-white border rounded-md p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Title" required>
            <input
              value={form.title}
              onChange={onChange("title")}
              className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g Green Energy Investment Opportunity"
            />
          </InputField>

          <InputField label="Category" required>
            <input
              value={form.category}
              onChange={onChange("category")}
              className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g Renewable Energy"
            />
          </InputField>

          <InputField label="Location" required>
            <input
              value={form.location}
              onChange={onChange("location")}
              className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Lagos, Nigeria"
            />
          </InputField>

          <InputField label="Investment Type" required>
            <input
              value={form.investmentType}
              onChange={onChange("investmentType")}
              className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g Equity or Debt"
            />
          </InputField>

          <InputField label="Expected ROI" required>
            <input
              value={form.expectedROI}
              onChange={onChange("expectedROI")}
              className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g 20%"
            />
          </InputField>

          <InputField label="Minimum Investment" required>
            <input
              type="number"
              value={form.minimumInvestment}
              onChange={onChange("minimumInvestment")}
              className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g 1000000"
            />
          </InputField>

          <InputField label="Currency" required>
            <select
              value={form.currency}
              onChange={onChange("currency")}
              className="w-full rounded-md border px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="NGN">NGN (₦)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </InputField>

          <InputField label="Closing Date" required>
            <input
              type="date"
              value={form.closingDate}
              onChange={onChange("closingDate")}
              className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </InputField>
        </div>
      </div>

      {/* ROI CHART */}
      <div className="bg-white border rounded-md p-6 shadow-sm mt-6">
        <h3 className="font-semibold mb-1">ROI & Risk Analysis</h3>
        <p className="text-xs text-gray-500 mb-4">Projected ROI Timeline</p>
        <div style={{ height: 320 }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6 ">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-md border text-gray-700"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 rounded-md text-sm bg-[#0b2447] text-white disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default OpportunityForm;
