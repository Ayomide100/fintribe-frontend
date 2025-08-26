import Image from "next/image";
import React from "react";
import herosect from "../../../assets/fintribe 1.png";
import logo from "../../../assets/fintribelogo.png";
import { Facebook } from "lucide-react";
import { BsGoogle } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const Register = () => {
  return (
    <div
      className="w-full min-h-screen flex"
      style={{
        background:
          "linear-gradient(to left, #CFE7DB, #E8EFF7, #FFFFFF, #FEFFFE, #FCFEFD)",
      }}
    >
      {/* Left Section - Form */}
      <div className="w-full md:w-[55%]  flex justify-center items-center p-6">
        <div className="w-full max-w-[34rem] ">
          {/* Logo */}
          <div className="w-full  py-4 flex justify-start items-center">
            <Image
              src={logo}
              alt="FinTribe Hero Section"
              className="w-[20%] h-auto object-contain"
            />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800">Sign Up</h2>
          <p className="text-sm text-gray-500 mb-6">
            Sign up now to join a community where investing is social, simple,
            and secure.
          </p>

          {/* Social Buttons */}
          <div className="flex gap-3 mb-6">
            <button className="flex justify-center items-center border border-gray-300 rounded-lg py-2 text-sm font-medium hover:bg-gray-100 transition">
              <FaFacebook />
              Facebook
            </button>
            <button className="flex justify-center items-center border border-gray-300 rounded-lg py-2 text-sm font-medium hover:bg-gray-100 transition">
              <BsGoogle />
              Google
            </button>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#0A2540] mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full border-1 border-[#6E6E6E] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#226B44]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[#0A2540] mb-1">
                Phone
              </label>
              <input
                type="tel"
                placeholder="Enter your Phone number"
                className="w-full border-1 border-[#6E6E6E] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#226B44]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#0A2540] mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Create your password"
                className="w-full border-1 border-[#6E6E6E] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#226B44]"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#0A2540] mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full border-1 border-[#6E6E6E] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#226B44]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0A2540] text-white py-2 rounded-lg font-medium hover:bg-[#1a3b5c] transition"
            >
              Sign Up
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#226B44] font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Right Section - Image (Hidden on Mobile) */}
      <div className="hidden md:flex w-[45%] h-full justify-center items-center p-6">
        <Image
          src={herosect}
          alt="Investment illustration"
          className="w-full h-[90%] object-cover rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default Register;
