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
import Dashboardlayouts from "@/pages/layouts/Dashboardlayouts";
import Head from "next/head";
import ProgressBar from "./progressbar";
import MediaStep from "./steptwo";

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

const InputRow: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="flex gap-6 items-center">
    <label className="w-1/4 text-sm text-gray-700">{label}</label>
    <div className="flex-1">{children}</div>
  </div>
);

export default function OpportunityForm() {
  const [form, setForm] = useState({
    projectName: "",
    fundingGoal: "",
    minInvestment: "",
    closingDate: "",
    category: "",
    duration: "",
    expectedROI: "",
    location: "",
  });

  const [step, setStep] = useState<number>(0);
  const steps = [
    "Basic Information",
    "Media",
    "Description",
    "Review and Publish",
  ];

  const onChange =
    (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((s) => ({ ...s, [key]: e.target.value }));

  const chartData = useMemo(() => {
    const months = Array.from({ length: 25 }, (_, i) => i);
    const minROI = months.map((m) => parseFloat(((m / 24) * 30).toFixed(2)));
    const maxROI = months.map((m) => parseFloat(((m / 24) * 45).toFixed(2)));

    return {
      labels: months.map((m) => (m % 3 === 0 ? `${m}` : "")),
      datasets: [
        {
          label: "Max ROI (50%)",
          data: maxROI,
          borderWidth: 2,
          tension: 0.25,
          fill: "+1",
          pointRadius: 3,
        },
        {
          label: "Min ROI (35%)",
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
          fill: true, // remove `type` property
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

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            {/* Basic Information */}
            <div className="bg-white border rounded-md p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <InputRow label="Project Name *">
                    <input
                      value={form.projectName}
                      onChange={onChange("projectName")}
                      className="w-full rounded-md border px-3 py-2 text-sm"
                      placeholder="e.g Green Solar Energy"
                    />
                  </InputRow>
                  <div className="mt-4">
                    <InputRow label="Funding Goal *">
                      <input
                        value={form.fundingGoal}
                        onChange={onChange("fundingGoal")}
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        placeholder="e.g ₦50,000,000"
                      />
                    </InputRow>
                  </div>
                  <div className="mt-4">
                    <InputRow label="Minimum Investment *">
                      <input
                        value={form.minInvestment}
                        onChange={onChange("minInvestment")}
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        placeholder="e.g ₦50,000"
                      />
                    </InputRow>
                  </div>
                  <div className="mt-4">
                    <InputRow label="Closing Date *">
                      <input
                        type="date"
                        value={form.closingDate}
                        onChange={onChange("closingDate")}
                        className="w-full rounded-md border px-3 py-2 text-sm"
                      />
                    </InputRow>
                  </div>
                </div>

                <div>
                  <InputRow label="Category *">
                    <select
                      value={form.category}
                      onChange={onChange("category")}
                      className="w-full rounded-md border px-3 py-2 text-sm bg-white"
                    >
                      <option value="">Select a Category</option>
                      <option>Energy</option>
                      <option>Agriculture</option>
                      <option>Real Estate</option>
                    </select>
                  </InputRow>

                  <div className="mt-4">
                    <InputRow label="Duration *">
                      <select
                        value={form.duration}
                        onChange={onChange("duration")}
                        className="w-full rounded-md border px-3 py-2 text-sm bg-white"
                      >
                        <option value="">Select Duration</option>
                        <option>6 months</option>
                        <option>12 months</option>
                        <option>24 months</option>
                      </select>
                    </InputRow>
                  </div>

                  <div className="mt-4">
                    <InputRow label="Expected ROI *">
                      <input
                        value={form.expectedROI}
                        onChange={onChange("expectedROI")}
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        placeholder="e.g 15-18%"
                      />
                    </InputRow>
                  </div>

                  <div className="mt-4">
                    <InputRow label="Location *">
                      <select
                        value={form.location}
                        onChange={onChange("location")}
                        className="w-full rounded-md border px-3 py-2 text-sm bg-white"
                      >
                        <option value="">Select a Location</option>
                        <option>Lagos, Nigeria</option>
                        <option>Abuja, Nigeria</option>
                        <option>Accra, Ghana</option>
                      </select>
                    </InputRow>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Chart */}
            <div className="bg-white border rounded-md p-6 shadow-sm mt-6">
              <h3 className="font-semibold mb-1">ROI & Risk Analysis</h3>
              <p className="text-xs text-gray-500 mb-4">
                Projected ROI Timeline
              </p>
              <div style={{ height: 320 }}>
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          </>
        );
      case 1:
        return <MediaStep step={step} setStep={setStep} />;
      case 2:
        return (
          <div className="bg-white border p-6 rounded-md">Description Step</div>
        );
      case 3:
        return (
          <div className="bg-white border p-6 rounded-md">
            Review & Publish Step
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dashboardlayouts>
      <Head>
        <title>Fintribe | Create Opportunity</title>
      </Head>
      <div className="px-5 mt-1 overflow-x-auto scrollbar-hide">
        <h2 className="text-lg font-semibold mb-2">Create Opportunities</h2>
        <p className="text-sm text-gray-500 mb-4">
          Share your investment opportunity with the finTribe community
        </p>
        <ProgressBar steps={steps} step={step} setStep={setStep} />
        {renderStep()}

        {/* Step Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-6 py-2 border rounded-md text-sm bg-white disabled:opacity-40"
          >
            Previous
          </button>

          <button
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            className="px-6 py-2 rounded-md text-sm bg-[#0b2447] text-white"
          >
            {step === steps.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </Dashboardlayouts>
  );
}
