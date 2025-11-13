/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ProgressBar from "./progressbar";
import StepOne from "./stepone";
import StepTwo from "./steptwo";
import StepThree from "./stepthree";
import LastStep from "./laststep";
import Dashboardlayouts from "@/pages/layouts/Dashboardlayouts";
import Head from "next/head";

const Connect = () => {
  const steps = [
    "Opportunity Info",
    "Media Upload",
    "Project Description",
    "Review & Submit",
  ];
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState<any>({}); // stores collected data for review at last step

  const handleNext = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <Dashboardlayouts>
      <Head>
        <title>Fintribe | Create Opportunity</title>
      </Head>
      <div className="w-full p-4">
        <ProgressBar steps={steps} step={step} setStep={setStep} />

        {step === 0 && <StepOne onNext={handleNext} />}

        {step === 1 && (
          <StepTwo
            onNext={handleNext}
            onBack={handleBack}
            step={step}
            setStep={setStep}
          />
        )}

        {step === 2 && (
          <StepThree
            onNext={handleNext as unknown as () => void}
            onBack={handleBack}
          />
        )}

        {step === 3 && <LastStep formData={formData} onBack={handleBack} />}
      </div>
    </Dashboardlayouts>
  );
};

export default Connect;
