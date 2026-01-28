"use client";
import React from "react";
import Head from "next/head";
import Dashboardlayouts from "../layouts/Dashboardlayouts";
import { Search, SquareArrowOutUpRight } from "lucide-react";

const Wallet = () => {
  return (
    <Dashboardlayouts>
      <Head>
        <title>Fintribe || Wallet</title>
      </Head>

      <div className="w-full space-y-6 p-7">
        {/* ===== BALANCE CARD ===== */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-8 flex flex-col md:flex-col md:items-center md:justify-between gap-4">
          <div className=" w-full">
            <p className="text-sm text-gray-500">Total Balance</p>
            <h2 className="text-2xl font-semibold">₦25,600.00</h2>
            <p className="text-xs text-[#2E8B57]">Available for withdrawal</p>
          </div>

          <div className="flex justify-between items-center w-full">
            <button className="px-6 py-3 bg-[#0B2545] md:px-40 text-white rounded-lg flex gap-3 text-sm font-medium">
              <SquareArrowOutUpRight size={20} /> Withdraw
            </button>
            <button className="px-11 py-1 border md:px-40 border-green-600 text-green-600 rounded-lg text-sm font-medium">
              + Add Bank Account
            </button>
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ===== ACCOUNTS ===== */}
          <div className="bg-white rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-lg">Accounts</h3>

            {/* Bank Card */}
            <div className="rounded-xl bg-linear-to-br from-[#0B2545] to-[#06182E] text-white p-4">
              <p className="text-sm opacity-80">Access Bank</p>
              <p className="mt-6 text-lg tracking-widest">******6789</p>
              <p className="mt-2 text-xs opacity-70">Guru&lsquo;s name</p>
            </div>

            <div className="rounded-xl bg-[#1C1C1C] text-white p-4">
              <p className="text-sm opacity-80">First Bank</p>
              <p className="mt-6 text-lg tracking-widest">******6789</p>
              <p className="mt-2 text-xs opacity-70">Guru&lsquo;s name</p>
            </div>

            <button className="w-full py-3 border border-green-600 text-green-600 rounded-lg text-sm font-medium">
              + Add New Bank
            </button>
          </div>

          {/* ===== TRANSACTIONS ===== */}
          <div className="lg:col-span-2 bg-white rounded-xl p-5">
            <h3 className="font-semibold text-lg">Transactions</h3>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full md:w-72">
                <Search size={18} className="text-gray-400" />
                <input
                  placeholder="Search transaction"
                  className="w-full outline-none text-sm"
                />
              </div>
              {/* Tabs */}
              <div className="flex gap-3 mb-4 border border-[#E0E0E0]">
                <button className="px-4 py-2 rounded-lg bg-[#0B2545] text-white text-sm">
                  All
                </button>
                <button className="px-4 py-2 rounded-lg border text-sm text-gray-600">
                  Earnings
                </button>
                <button className="px-4 py-2 rounded-lg border text-sm text-gray-600">
                  Withdrawals
                </button>
              </div>
            </div>

            {/* Transaction List */}
            <div className="space-y-3">
              {/* Credit Transaction */}
              <div className="flex items-center gap-3 bg-[#E8F5E9] border border-[#C8E6C9] rounded-lg p-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 10L4 10M4 10L10 16M4 10L10 4"
                      stroke="#4CAF50"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="rotate(90 10 10)"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Description of Payment received
                  </p>
                  <p className="text-xs text-gray-500">Today • 12:32</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold text-green-600">
                    +₦2,000
                  </p>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 4L8 12M8 12L12 8M8 12L4 8"
                      stroke="#4CAF50"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Debit Transaction */}
              <div className="flex items-center gap-3 bg-[#FFEBEE] border border-[#FFCDD2] rounded-lg p-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 10L4 10M4 10L10 16M4 10L10 4"
                      stroke="#F44336"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="rotate(-90 10 10)"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Debit made
                  </p>
                  <p className="text-xs text-gray-500">Today • 12:32</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold text-red-600">-₦1,000</p>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 12L8 4M8 4L4 8M8 4L12 8"
                      stroke="#F44336"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Credit Transaction */}
              <div className="flex items-center gap-3 bg-[#E8F5E9] border border-[#C8E6C9] rounded-lg p-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 10L4 10M4 10L10 16M4 10L10 4"
                      stroke="#4CAF50"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="rotate(90 10 10)"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Description of Payment received
                  </p>
                  <p className="text-xs text-gray-500">Today • 12:32</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold text-green-600">
                    +₦2,000
                  </p>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 4L8 12M8 12L12 8M8 12L4 8"
                      stroke="#4CAF50"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Debit Transaction */}
              <div className="flex items-center gap-3 bg-[#FFEBEE] border border-[#FFCDD2] rounded-lg p-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 10L4 10M4 10L10 16M4 10L10 4"
                      stroke="#F44336"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="rotate(-90 10 10)"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Debit made
                  </p>
                  <p className="text-xs text-gray-500">Today • 12:32</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold text-red-600">-₦1,000</p>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 12L8 4M8 4L4 8M8 4L12 8"
                      stroke="#F44336"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Credit Transaction */}
              <div className="flex items-center gap-3 bg-[#E8F5E9] border border-[#C8E6C9] rounded-lg p-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 10L4 10M4 10L10 16M4 10L10 4"
                      stroke="#4CAF50"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="rotate(90 10 10)"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Description of Payment received
                  </p>
                  <p className="text-xs text-gray-500">Today • 12:32</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold text-green-600">
                    +₦2,000
                  </p>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 4L8 12M8 12L12 8M8 12L4 8"
                      stroke="#4CAF50"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Debit Transaction */}
              <div className="flex items-center gap-3 bg-[#FFEBEE] border border-[#FFCDD2] rounded-lg p-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 10L4 10M4 10L10 16M4 10L10 4"
                      stroke="#F44336"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="rotate(-90 10 10)"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Debit made
                  </p>
                  <p className="text-xs text-gray-500">Today • 12:32</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold text-red-600">-₦1,000</p>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 12L8 4M8 4L4 8M8 4L12 8"
                      stroke="#F44336"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Credit Transaction */}
              <div className="flex items-center gap-3 bg-[#E8F5E9] border border-[#C8E6C9] rounded-lg p-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 10L4 10M4 10L10 16M4 10L10 4"
                      stroke="#4CAF50"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="rotate(90 10 10)"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Description of Payment received
                  </p>
                  <p className="text-xs text-gray-500">Today • 12:32</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold text-green-600">
                    +₦2,000
                  </p>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 4L8 12M8 12L12 8M8 12L4 8"
                      stroke="#4CAF50"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Debit Transaction */}
              <div className="flex items-center gap-3 bg-[#FFEBEE] border border-[#FFCDD2] rounded-lg p-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 10L4 10M4 10L10 16M4 10L10 4"
                      stroke="#F44336"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="rotate(-90 10 10)"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Debit made
                  </p>
                  <p className="text-xs text-gray-500">Today • 12:32</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold text-red-600">-₦1,000</p>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 12L8 4M8 4L4 8M8 4L12 8"
                      stroke="#F44336"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Credit Transaction */}
              <div className="flex items-center gap-3 bg-[#E8F5E9] border border-[#C8E6C9] rounded-lg p-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 10L4 10M4 10L10 16M4 10L10 4"
                      stroke="#4CAF50"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="rotate(90 10 10)"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Description of Payment received
                  </p>
                  <p className="text-xs text-gray-500">Today • 12:32</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold text-green-600">
                    +₦2,000
                  </p>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 4L8 12M8 12L12 8M8 12L4 8"
                      stroke="#4CAF50"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboardlayouts>
  );
};

export default Wallet;
