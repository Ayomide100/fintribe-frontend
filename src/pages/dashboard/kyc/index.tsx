import React from "react";
import Dashboardlayouts from "../../layouts/Dashboardlayouts";
import Head from "next/head";
import { ShieldCheck, Lock, Users } from "lucide-react"; // example icons
import { useRouter } from "next/router";
import Verify from "./verify";

const Kyc = () => {
  const router = useRouter();

  return (
    <Dashboardlayouts>
      <Head>
        <title>Fintribe | KYC Verification</title>
      </Head>

      <div className="w-full min-h-[25rem]  md:p-6 flex flex-col   justify-center items-center">
        <div className=" md:w-[90%] w-full p-6 bg-white rounded-md flex justify-center items-center flex-col border shadow-xl border-[#E0E0E0] ">
          <Verify />
          <div>
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-md border border-gray-200 p-8">
              {/* Header */}

              {/* Benefits */}
              <div className="space-y-6 text-center">
                <div>
                  <ShieldCheck className="mx-auto h-6 w-6 text-green-600 mb-2" />
                  <h3 className="font-semibold text-[#0A2540]">
                    Access Premium Opportunities
                  </h3>
                  <p className="text-sm text-gray-600">
                    Connect with verified partners and exclusive deals
                  </p>
                </div>

                <div>
                  <Lock className="mx-auto h-6 w-6 text-green-600 mb-2" />
                  <h3 className="font-semibold text-[#0A2540]">
                    Enhanced Security
                  </h3>
                  <p className="text-sm text-gray-600">Protect your account</p>
                </div>

                <div>
                  <Users className="mx-auto h-6 w-6 text-green-600 mb-2" />
                  <h3 className="font-semibold text-[#0A2540]">
                    Join Elite Circles
                  </h3>
                  <p className="text-sm text-gray-600">
                    Access to verified investor communities
                  </p>
                </div>
              </div>

              {/* Action button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => router.push("/dashboard/kyc/stepone")}
                  className="bg-[#0A2540] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#0d2f66] transition"
                >
                  Start Verification
                </button>
              </div>

              {/* Footer Note */}
              <p className="mt-6 text-xs text-gray-500 text-center">
                Your information is encrypted and secure. We never share your
                personal data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Dashboardlayouts>
  );
};

export default Kyc;
