import React, { useState } from "react";
import herosect from "../../../assets/fintribe 1.png";
import logo from "../../../assets/fintribelogo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import CustomInput from "../(components)/Authcomp/custominput";

const ResetPassword = () => {
  const nav = useRouter();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  type InputName = "newPassword" | "confirmPassword";
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when user starts typing
    if (errors[name as InputName]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {
      newPassword?: string;
      confirmPassword?: string;
      general?: string;
    } = {};

    // Password validation
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must contain uppercase, lowercase, and number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for password reset
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate success/failure
          const success = true; // Change this to simulate different scenarios

          if (success) {
            resolve(undefined);
          } else {
            reject(new Error("Failed to reset password. Please try again."));
          }
        }, 2000);
      });

      // Show success message
      setShowSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        nav.push("/auth/login");
      }, 3000);
    } catch (error) {
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Success screen
  if (showSuccess) {
    return (
      <div
        className="w-full min-h-screen flex items-stretch"
        style={{
          background:
            "linear-gradient(to right, #CFE7DB, #E8EFF7, #FFFFFF, #FEFFFE, #FCFEFD)",
        }}
      >
        <div className="hidden md:flex w-[45%] justify-center items-center p-6">
          <Image
            src={herosect}
            alt="Investment illustration"
            className="w-full h-[100%] object-cover rounded-2xl shadow-lg"
          />
        </div>

        <div className="w-full md:w-[55%] flex justify-center items-center p-6">
          <div className="w-full max-w-[34rem] text-center">
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

            <div className="flex flex-col items-center space-y-4 mt-8">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800">
                Password Reset Successful!
              </h2>

              <p className="text-gray-600 text-center max-w-md">
                Your password has been successfully updated. You will be
                redirected to the login page in a few seconds.
              </p>

              <button
                onClick={() => nav.push("/auth/login")}
                className="mt-4 px-6 py-2 bg-[#0A2540] text-white rounded-lg font-medium hover:bg-[#1a3b5c] transition"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Reset password form
  return (
    <div
      className="w-full min-h-screen flex items-stretch"
      style={{
        background:
          "linear-gradient(to right, #CFE7DB, #E8EFF7, #FFFFFF, #FEFFFE, #FCFEFD)",
      }}
    >
      <div className="hidden md:flex w-[45%] justify-center items-center p-6">
        <Image
          src={herosect}
          alt="Investment illustration"
          className="w-full h-[100%] object-cover rounded-2xl shadow-lg"
        />
      </div>

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
              Change Password
            </h2>
            <p className="text-sm text-gray-500">
              Create a new password and confirm below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error Message */}
            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            {/* New Password */}
            <CustomInput
              label="New password"
              type="password"
              name="newPassword"
              placeholder="Enter your new password"
              value={formData.newPassword}
              onChange={handleInputChange}
              error={errors.newPassword}
              required
            />

            {/* Confirm New Password */}
            <CustomInput
              label="Confirm new password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your new password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              required
            />

            {/* Password Requirements */}
            <div className="text-xs text-gray-500 space-y-1">
              <p className="font-medium">Password requirements:</p>
              <ul className="space-y-1 ml-4">
                <li
                  className={`flex items-center gap-2 ${
                    formData.newPassword.length >= 8
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  <span className="text-xs">•</span>
                  At least 8 characters long
                </li>
                <li
                  className={`flex items-center gap-2 ${
                    /(?=.*[a-z])(?=.*[A-Z])/.test(formData.newPassword)
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  <span className="text-xs">•</span>
                  Contains uppercase and lowercase letters
                </li>
                <li
                  className={`flex items-center gap-2 ${
                    /(?=.*\d)/.test(formData.newPassword)
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  <span className="text-xs">•</span>
                  Contains at least one number
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-medium text-white transition-colors ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0A2540] hover:bg-[#1a3b5c]"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating Password...
                </div>
              ) : (
                "Confirm"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
