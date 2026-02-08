"use client";

import { Dialog } from "@headlessui/react";
import { X, ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function WithdrawModal({ isOpen, onClose }: Props) {
  const [amount, setAmount] = useState("");

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">Withdraw money</h2>
              <p className="text-sm text-gray-500">
                Withdraw money from your wallet
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"
            >
              <X size={16} className="text-green-700" />
            </button>
          </div>

          {/* Withdraw To */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <p>Select Bank</p>
              <p className="text-gray-400">Withdraw to:</p>
            </div>

            <button className="w-full border rounded-lg px-4 py-3 flex items-center justify-between text-sm">
              <span className="text-gray-700">
                Access Bank Nigeria (******8089)
              </span>
              <ChevronDown size={18} className="text-gray-400" />
            </button>

            <button className="flex items-center gap-2 text-green-600 text-sm font-medium">
              Add New Bank Account <ArrowRight size={16} />
            </button>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <input
              placeholder="Enter amount"
              className="w-full border rounded-lg px-4 py-3 text-sm outline-none"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <p className="text-sm text-gray-500">
              balance:{" "}
              <span className="text-green-600 font-medium">₦25,600.00</span>
            </p>
          </div>

          {/* Withdraw Button */}
          <button className="w-full py-3 rounded-lg bg-[#0B2545] text-white font-medium">
            Withdraw
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
