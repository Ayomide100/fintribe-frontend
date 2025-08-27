/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import herosect from "../../../assets/fintribe 1.png";
import logo from "../../../assets/fintribelogo.png";
import Image from "next/image";
import { useRouter } from "next/router";

const VerifyEmail = () => {
  const nav = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Email should come from router query or context in real app
  const userEmail = "user@example.com"; // This should be dynamic

  // Countdown timer for resend code
  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only allow single digit
    setOtp(newOtp);
    setError(""); // Clear error when user types

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const pasteDigits = pasteData.replace(/\D/g, "").slice(0, 6);

    const newOtp = [...otp];
    for (let i = 0; i < pasteDigits.length; i++) {
      newOtp[i] = pasteDigits[i];
    }
    setOtp(newOtp);

    // Focus the next empty field or the last field
    const nextIndex = Math.min(pasteDigits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // Handle form submission
  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Please enter a complete 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate verification logic
          if (otpCode === "123456") {
            // Mock verification
            resolve(undefined);
          } else {
            reject(new Error("Invalid verification code"));
          }
        }, 1500);
      });

      // Success - redirect to dashboard or next step
      nav.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Verification failed. Please try again.");
      } else {
        setError("Verification failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend code
  const handleResendCode = async () => {
    if (!canResend) return;

    setCanResend(false);
    setCountdown(60);
    setError("");
    setOtp(["", "", "", "", "", ""]);

    try {
      // Simulate resend API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Show success message or handle resend logic
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-stretch"
      style={{
        background:
          "linear-gradient(to left, #CFE7DB, #E8EFF7, #FFFFFF, #FEFFFE, #FCFEFD)",
      }}
    >
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

          {/* Title and Description */}
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
              Enter code below to verify.
            </p>
          </div>

          {/* OTP Input Form */}
          <form onSubmit={handleVerify} className="space-y-6">
            {/* OTP Input Fields */}
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

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Resend Code */}
            <div className="text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-[#226B44] text-sm font-medium hover:underline"
                >
                  Didn&lsquo;t get code? Resend Code
                </button>
              ) : (
                <p className="text-gray-500 text-sm">
                  Didn&lsquo;t get code? Resend Code in {countdown}s
                </p>
              )}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading || otp.join("").length !== 6}
              className={`w-full py-3 rounded-lg font-medium text-white transition-colors ${
                isLoading || otp.join("").length !== 6
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
  );
};

export default VerifyEmail;
