/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "@/config/axiosconfig";
import toast from "react-hot-toast";

interface JoinPrivateModalProps {
  circleId: string;
  onClose: () => void;
}

const JoinPrivateModal: React.FC<JoinPrivateModalProps> = ({
  circleId,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  //   const authorizationUrl = localStorage.getItem("authorizationUrl");
  const reference = localStorage.getItem("paymentReference");
  console.log(reference);

  const handleJoinPrivate = async () => {
    setLoading(true);
    const toastId = toast.loading("Joining circle...");
    try {
      await axios.post(
        `/circle/${circleId}/join-private`,
        {
          paymentReference: reference,
        },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );

      toast.success("Successfully joined private circle!", { id: toastId });
      onClose();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while joining the circle.",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-lg text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Payment Already Completed
        </h2>
        <p className="text-gray-600 mb-4">
          It looks like you’ve already paid for this circle. Would you like to
          join now?
        </p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleJoinPrivate}
            disabled={loading}
            className="flex-1 bg-[#0A2540] text-white py-2 rounded-lg hover:bg-[#1b3a5a] transition disabled:opacity-50"
          >
            {loading ? "Joining..." : "Join Circle"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinPrivateModal;
