import React, { useState } from "react";
import herosect from "../../../assets/fintribe 1.png";
import logo from "../../../assets/fintribelogo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import CustomInput from "../(components)/Authcomp/custominput";
import axios from "@/config/axiosconfig";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";

const Forgetpassword = () => {
  const nav = useRouter();

  const [loading, setloading] = useState(false);
  const [email, setemail] = useState("");
  const router = useRouter();

  const HandlePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    try {
      const response = await axios.post("/users/forgot-password", { email });
      console.log("Registration successful:", response.data);
      localStorage.setItem("token", response.data.content.token);
      toast.success("Registration successful!");
      setTimeout(() => {
        setemail("");
        router.push("/auth/verifyforgetpassword");
      }, 3000);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        const apiError = error.response?.data?.error;
        const fallback = error.message || "An unexpected error occurred";

        const errorMsg =
          `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
          fallback;

        toast.error(errorMsg);
      } else {
        toast.error("Error occurred");
      }
    } finally {
      setloading(false);
    }
  };

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
          className="w-full h-full object-cover rounded-2xl shadow-lg"
        />
      </div>
      <div className="w-full md:w-[55%] flex justify-center items-center p-6">
        <div className="w-full max-w-136 ">
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
          <form className="flex flex-col gap-4" onSubmit={HandlePassword}>
            <CustomInput
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your Email"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A2540] text-white py-2 rounded-lg font-medium hover:bg-[#1a3b5c] transition"
            >
              {loading ? (
                <span className="flex justify-center text-white items-center">
                  <BiLoaderCircle className="mr-2 animate-spin" size={22} />
                </span>
              ) : (
                <span>Send Code</span>
              )}
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
