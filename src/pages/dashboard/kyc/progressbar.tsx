import React from "react";

const ProgressBar = ({ progress = 20, step = 1, totalSteps = 4 }) => {
  return (
    <div className="w-full max-w-xl mx-auto space-y-2">
      {/* Header */}
      <div className="flex justify-between text-sm font-medium text-gray-700">
        <span>
          Step {step} of {totalSteps}
        </span>
        <span>{progress}% complete</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
