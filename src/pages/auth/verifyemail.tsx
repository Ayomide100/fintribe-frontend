/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useRef, useEffect } from "react";
import herosect from "../../../assets/fintribe 1.png";
import logo from "../../../assets/fintribelogo.png";
import Image from "next/image";
import { useRouter } from "next/router";

import toast, { Toaster } from "react-hot-toast";
import axios from "@/config/axiosconfig";
import Head from "next/head";

const VerifyEmail = () => {
  const nav = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]); // 4 digits only
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const userEmail = "user@example.com"; // TODO: get dynamically

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const pasteDigits = pasteData.replace(/\D/g, "").slice(0, 4);

    const newOtp = [...otp];
    for (let i = 0; i < pasteDigits.length; i++) {
      newOtp[i] = pasteDigits[i];
    }
    setOtp(newOtp);

    const nextIndex = Math.min(pasteDigits.length, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  // Handle Verify OTP
  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 4) {
      setError("Please enter a complete 4-digit code");
      toast.error("Please enter a complete 4-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "/users/verify-otp",
        {
          otp: otpCode,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);

      toast.success("Email verified successfully!");
      nav.push("/auth/login");
    } catch (err: any) {
      const msg =
        err.response?.data?.message || "Verification failed. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendCode = async () => {
    if (!canResend) return;

    setCanResend(false);
    setCountdown(60);
    setError("");
    setOtp(["", "", "", ""]);

    try {
      await axios.post("/users/resend-otp", { email: userEmail });
      toast.success("OTP resent successfully!");
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        "Failed to resend code. Please try again.";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <>
      <Head>
        <title>Verify Email</title>
      </Head>
      <div
        className="w-full min-h-screen flex items-stretch"
        style={{
          background:
            "linear-gradient(to left, #CFE7DB, #E8EFF7, #FFFFFF, #FEFFFE, #FCFEFD)",
        }}
      >
        <Toaster position="top-center" reverseOrder={false} />

        {/* Left Section - Form */}
        <div className="w-full md:w-[55%] flex justify-center items-center p-6">
          <div className="w-full max-w-[34rem]">
            {/* Logo */}
            <div
              onClick={() => nav.push("/")}
              className="w-full py-4 flex justify-start items-center cursor-pointer"
            >
              <Image
                src={logo}
                alt="FinTribe Logo"
                className="w-[20%] h-auto object-contain"
              />
            </div>

            {/* Title */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Verify your email
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                A verification code has been sent to{" "}
                <span className="font-medium text-gray-700">
                  {userEmail.replace(/(.{3}).*@/, "$1****@")}
                </span>
                <br />
                Enter the 4-digit code below.
              </p>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="flex justify-between gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className={`w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg focus:outline-none transition-colors ${
                      error
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-[#226B44]"
                    } ${digit ? "bg-gray-50" : "bg-white"}`}
                    disabled={isLoading}
                  />
                ))}
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <div className="text-center">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-[#226B44] text-sm font-medium hover:underline"
                  >
                    Didn’t get code? Resend Code
                  </button>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Didn’t get code? Resend in {countdown}s
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.join("").length !== 4}
                className={`w-full py-3 rounded-lg font-medium text-white transition-colors ${
                  isLoading || otp.join("").length !== 4
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#0A2540] hover:bg-[#1a3b5c]"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:flex w-[45%] justify-center items-center p-6">
          <Image
            src={herosect}
            alt="Investment illustration"
            className="w-full h-[100%] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
