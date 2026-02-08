"use client";
import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const banks = [
  "Access Bank",
  "First Bank",
  "GTBank",
  "UBA",
  "Zenith Bank",
  "Fidelity Bank",
];

export default function AddBankModal({ isOpen, onClose }: Props) {
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  if (!isOpen) return null;

  // 👉 Fake verification (Replace later with API)
  const verifyAccount = () => {
    if (accountNumber.length === 10) {
      setAccountName("Daniel Ben"); // simulate response
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">Add Bank Account</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Select Bank */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Select Bank</label>
          <select
            className="w-full border rounded-lg p-2 text-sm"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
          >
            <option value="">Choose bank</option>
            {banks.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Account Number */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Account Number</label>
          <input
            className="w-full border rounded-lg p-2 text-sm"
            placeholder="Enter 10-digit account number"
            value={accountNumber}
            onChange={(e) => {
              setAccountNumber(e.target.value);
              setAccountName("");
            }}
            onBlur={verifyAccount}
          />
        </div>

        {/* Account Name */}
        <div className="space-y-1">
          {/* Label */}
          <p className="text-xs text-gray-500">Account name found</p>

          {/* Account Name */}
          <input
            className="w-full border rounded-lg p-2 text-sm bg-gray-100 text-gray-700 cursor-not-allowed"
            value={accountName || "—"}
            readOnly
          />
        </div>

        {/* Save Button */}
        <button className="w-full py-3 bg-[#0B2545] text-white rounded-lg text-sm font-medium">
          Save Account
        </button>
      </div>
    </div>
  );
}
