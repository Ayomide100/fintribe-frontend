import { isAxiosError } from "axios";
import axios from "../../../config/axiosconfig";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface SectionProps {
  title: string;
  color: string;
  items: string[];
  showInput: boolean;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

function Section({
  title,
  color,
  items,
  showInput,
  setShowInput,
  inputValue,
  setInputValue,
  onAdd,
  onRemove,
}: SectionProps) {
  const colorClasses: Record<
    string,
    {
      text: string;
      bg: string;
      border: string;
      hover: string;
      lightBg: string;
      lightText: string;
    }
  > = {
    green: {
      text: "text-green-600",
      bg: "bg-green-600",
      border: "border-green-400",
      hover: "hover:bg-green-50",
      lightBg: "bg-green-100",
      lightText: "text-green-700",
    },
    blue: {
      text: "text-blue-600",
      bg: "bg-blue-600",
      border: "border-blue-400",
      hover: "hover:bg-blue-50",
      lightBg: "bg-blue-100",
      lightText: "text-blue-700",
    },
    orange: {
      text: "text-orange-600",
      bg: "bg-orange-600",
      border: "border-orange-400",
      hover: "hover:bg-orange-50",
      lightBg: "bg-orange-100",
      lightText: "text-orange-700",
    },
  };

  const c = colorClasses[color];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{title}</h3>
        <button
          onClick={() => setShowInput(!showInput)}
          className={`px-3 py-1 border rounded ${c.text} ${c.hover} text-sm`}
        >
          {showInput ? "Cancel" : `Add ${title}`}
        </button>
      </div>

      <div className="space-y-2 mb-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`bg-opacity-20 ${c.border} border px-4 py-2 rounded flex items-center justify-between`}
          >
            <span className="flex items-center">
              <svg
                className={`w-5 h-5 ${c.text} mr-2`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {item}
            </span>
            <button
              className="text-red-400 ml-2"
              onClick={() => onRemove(idx)}
              title="Remove"
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      {showInput && (
        <div className="flex items-center gap-2 mb-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Enter new ${title.toLowerCase()}`}
            className="border px-3 py-2 rounded w-full text-sm"
          />
          <button
            onClick={onAdd}
            className={`px-3 py-2 ${c.bg} text-white rounded text-sm`}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProjectDescriptionForm({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [fullDesc, setFullDesc] = useState("");
  const [descError, setDescError] = useState("");

  const [dueDiligence, setDueDiligence] = useState<string[]>([]);
  const [keyHighlights, setkeyHighlights] = useState<string[]>([]);
  const [riskFactors, setRiskFactors] = useState<string[]>([]);

  // Input visibility + temp inputs
  const [showDueInput, setShowDueInput] = useState(false);
  const [showHighlightInput, setShowHighlightInput] = useState(false);
  const [showRiskInput, setShowRiskInput] = useState(false);

  const [dueInput, setDueInput] = useState("");
  const [highlightInput, setHighlightInput] = useState("");
  const [riskInput, setRiskInput] = useState("");

  // Generic add handlers
  const handleAdd = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
    resetInput: React.Dispatch<React.SetStateAction<string>>,
    hideInput: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!value.trim()) return;
    setList([...list, value.trim()]);
    resetInput("");
    hideInput(false);
  };

  const handleRemove = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleDescription = async (): Promise<boolean> => {
    // local validation
    if (fullDesc.trim().length < 20) {
      setDescError("Project description must be at least 20 characters.");
      toast.error("Description must be at least 20 characters.");
      return false;
    }

    setDescError(""); // clear error if valid

    const toastId = toast.loading("Updating description...");
    const id = localStorage.getItem("opportunityId");

    try {
      const res = await axios.put(
        `/opportunity/${id}/description`,
        {
          description: fullDesc,
          dueDiligence,
          keyHighlights,
          riskFactors,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data.content);

      toast.success("Description updated successfully ✅");
      return true;
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "An unexpected error occurred";

        // show backend validation error under textarea
        setDescError(message);
        toast.error(message);
      } else {
        toast.error("Error occurred");
      }
      return false;
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-md shadow">
      {/* Description Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Detailed Description</h2>
        <p className="text-sm text-gray-500 mb-1">
          Provide comprehensive information about your opportunity and key
          selling points and risks.
        </p>
        <label className="block font-medium mb-1" htmlFor="description">
          Full Project Description<span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={fullDesc}
          onChange={(e) => {
            setFullDesc(e.target.value);
            if (e.target.value.length >= 20) setDescError("");
          }}
          className="w-full border rounded px-3 py-2 mt-1 mb-1"
          rows={4}
          placeholder="Provide a detailed description of your investment opportunity"
        />

        {descError && <p className="text-red-500 text-sm mb-4">{descError}</p>}
      </div>

      <Section
        title="Due Diligence"
        color="green"
        items={dueDiligence}
        showInput={showDueInput}
        setShowInput={setShowDueInput}
        inputValue={dueInput}
        setInputValue={setDueInput}
        onAdd={() =>
          handleAdd(
            dueDiligence,
            setDueDiligence,
            dueInput,
            setDueInput,
            setShowDueInput
          )
        }
        onRemove={(i) => handleRemove(dueDiligence, setDueDiligence, i)}
      />

      <Section
        title="Key Highlights"
        color="blue"
        items={keyHighlights}
        showInput={showHighlightInput}
        setShowInput={setShowHighlightInput}
        inputValue={highlightInput}
        setInputValue={setHighlightInput}
        onAdd={() =>
          handleAdd(
            keyHighlights,
            setkeyHighlights,
            highlightInput,
            setHighlightInput,
            setShowHighlightInput
          )
        }
        onRemove={(i) => handleRemove(keyHighlights, setkeyHighlights, i)}
      />

      <Section
        title="Risk Factors"
        color="orange"
        items={riskFactors}
        showInput={showRiskInput}
        setShowInput={setShowRiskInput}
        inputValue={riskInput}
        setInputValue={setRiskInput}
        onAdd={() =>
          handleAdd(
            riskFactors,
            setRiskFactors,
            riskInput,
            setRiskInput,
            setShowRiskInput
          )
        }
        onRemove={(i) => handleRemove(riskFactors, setRiskFactors, i)}
      />

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-md border text-gray-700"
        >
          Back
        </button>

        <button
          onClick={async () => {
            const success = await handleDescription();
            if (success) {
              onNext();
            }
          }}
          className="px-4 py-2 rounded-md bg-[#0b2447] text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}

/* === Section Component === */
