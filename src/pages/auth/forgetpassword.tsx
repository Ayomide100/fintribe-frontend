import React from "react";
import herosect from "../../../assets/fintribe 1.png";
import logo from "../../../assets/fintribelogo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import CustomInput from "../(components)/Authcomp/custominput";

const Forgetpassword = () => {
  const nav = useRouter();

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
        <div className="w-full max-w-[34rem] ">
          <div
            onClick={() => nav.push("/")}
            className="w-full py-4 flex justify-start items-center cursor-pointer"
          >
            <Image
              src={logo}
              alt="FinTribe Hero Section"
              className="w-[20%] h-auto object-contain"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter your email to get a verification code
          </p>
          <form className="flex flex-col gap-4">
            <CustomInput
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your Email"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#0A2540] text-white py-2 rounded-lg font-medium hover:bg-[#1a3b5c] transition"
            >
              Send Code
            </button>
          </form>
          <div>
            <p className="text-sm text-gray-600 text-center mt-4">
              Already have an account?{" "}
              <span
                onClick={() => nav.push("/auth/login")}
                className="text-[#226B44] cursor-pointer font-medium hover:underline"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgetpassword;
