import React from "react";
import { X } from "lucide-react";

interface PrivatepayModalProps {
  onClose: () => void;
  circleName?: string;
  guru?: string;
  amount?: number;
  onJoin?: () => void;
}

const PrivatepayModal: React.FC<PrivatepayModalProps> = ({
  onClose,
  circleName = "Private Circle",
  guru = "Unknown Guru",
  amount = 0,
  onJoin,
}) => {
  // const [method, setMethod] = useState("wallet");

  const handleJoinClick = () => {
    if (onJoin) {
      onJoin(); // trigger join function
      onClose(); // close modal after joining
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative border border-gray-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Join <span className="text-[#226B44]">{circleName}</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Complete your payment to gain access
          </p>
        </div>

        <p className="text-sm text-gray-500 text-center mb-6">
          Review the details before joining{" "}
          <span className="font-medium">{circleName}</span>
        </p>

        {/* Payment Details */}
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="text-gray-600">Circle:</p>
              <p className="font-medium text-gray-800">{circleName}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-600">Guru:</p>
              <p className="font-medium text-gray-800">{guru}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-600">Account Type:</p>
              <p className="font-medium text-gray-800 capitalize">Private</p>
            </div>

            <hr className="my-2 border-gray-200" />

            <div className="flex justify-between">
              <p className="text-gray-800 font-medium">Total Amount:</p>
              <p className="text-[#226B44] font-semibold text-lg">₦{amount}</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        {/* <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">
            Payment Method
          </h4>
          <div className="flex flex-col gap-2">
            {["wallet", "card", "bank"].map((option) => (
              <label
                key={option}
                className={`flex items-center justify-between border rounded-lg px-4 py-2 cursor-pointer transition ${
                  method === option
                    ? "border-[#226B44] bg-[#E9F7EF]"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="capitalize text-gray-700 font-medium">
                  {option === "wallet"
                    ? "Wallet Balance"
                    : option === "card"
                    ? "Debit / Credit Card"
                    : "Bank Transfer"}
                </span>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option}
                  checked={method === option}
                  onChange={() => setMethod(option)}
                  className="text-[#226B44] focus:ring-[#226B44]"
                />
              </label>
            ))}
          </div>
        </div> */}

        {/* Confirm Button */}
        <button
          onClick={handleJoinClick}
          className="w-full bg-[#0A2540] hover:bg-[#0A2540] text-white py-3 rounded-lg font-medium transition-all"
        >
          Proceed to Pay ₦{amount}
        </button>

        {/* Cancel Option */}
        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500 mt-3 hover:text-gray-700 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PrivatepayModal;
