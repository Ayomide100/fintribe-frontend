import React from "react";

interface ProgressBarProps {
  steps: string[];
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, step, setStep }) => {
  const progressPercent = ((step + 1) / steps.length) * 100;

  return (
    <div className="flex flex-col mb-6">
      {/* Progress Info */}
      <div className="w-full px-3 mb-2">
        <p className="text-sm font-medium text-gray-700">
          Step {step + 1} of {steps.length}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 bg-[#2E8B57] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-sm text-gray-500 w-full text-right mt-1">
          {Math.round(progressPercent)}% Complete
        </div>
      </div>

      {/* Step Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3  md:flex md:flex-wrap md:justify-around gap-2 px-3 mt-3">
        {steps.map((label, i) => (
          <button
            key={label}
            onClick={() => setStep(i)}
            className={`text-xs sm:text-sm h-10 rounded-md border transition-all duration-200
        py-2 sm:py-1
        w-full md:w-60
        ${
          i === step
            ? "bg-[#2E8B57] text-white border-[#2E8B57]"
            : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
        }
      `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
