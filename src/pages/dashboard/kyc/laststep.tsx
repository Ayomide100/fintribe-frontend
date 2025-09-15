import Dashboardlayouts from "@/pages/layouts/Dashboardlayouts";
import Head from "next/head";

import Verify from "./verify";
import { ArrowRight, Check, Clock3, ShieldCheck } from "lucide-react";

const LastStep = () => {
  const submissionSteps = [
    {
      id: "review",
      title: "Review Process",
      description: "Your documents are being reviewed",
      extra: "Usually takes 1–2 business days",
    },
    {
      id: "processing",
      title: "Secure Processing",
      description: "We are securely processing your documents",
      extra: "Your data is encrypted and protected",
    },
  ];

  return (
    <Dashboardlayouts>
      <Head>
        <title>Fintribe | KYC Submitted</title>
      </Head>
      <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center px-4">
        <div className="w-full md:w-[90%] h-auto md:h-[90%] bg-white shadow-md rounded-md flex flex-col gap-4 items-center py-6">
          {/* Header with Verify component */}
          <div className="w-full flex justify-start h-auto md:h-[10%] p-3">
            <Verify />
          </div>

          {/* Main Content Container */}
          <div className="w-full md:w-[60%] shadow-md p-3 rounded-md flex flex-col items-center px-4">
            {/* Status Card */}
            <div className="w-full max-w-lg flex flex-col justify-center items-center p-6 mb-8 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-[#2E8B57] border flex items-center justify-center mb-3">
                  <Check className="w-8 h-8 text-[#2E8B57]" />
                </div>
                <span className="text-[#2E8B57] font-semibold text-lg">
                  KYC Submitted!
                </span>
              </div>
              <p className="text-green-700 text-sm mt-3 text-center">
                Your verification request is being reviewed and you&lsquo;ll be
                updated via email.
              </p>
            </div>

            {/* Process Steps */}
            <div className="w-full max-w-lg space-y-6 mb-8">
              {submissionSteps.map((step) => (
                <div key={step.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8  rounded-full flex items-center justify-center text-white">
                      {step.id === "review" ? (
                        <Clock3 className=" text-[#2E8B57]" size={27} />
                      ) : (
                        <ShieldCheck className=" text-[#2E8B57]" size={27} />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-2">
                      <h3 className="text-base font-semibold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">{step.description}</p>
                    {step.extra && (
                      <p className="text-xs text-gray-500 mt-1">{step.extra}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="w-full max-w-lg">
              <button className="w-full bg-[#0A2540] hover:bg-[#1F3B5A] flex justify-center gap-4 items-center text-white font-semibold py-3 px-6 rounded-lg transition-colors text-base">
                Back to Dashboard
                <ArrowRight />
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-center text-sm text-gray-500 mt-6">
              You&lsquo;ll receive an email notification once your verification
              is complete
            </p>
          </div>
        </div>
      </div>
    </Dashboardlayouts>
  );
};

export default LastStep;
