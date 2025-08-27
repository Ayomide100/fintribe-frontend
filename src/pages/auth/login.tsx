import Image from "next/image";
import React, { useState } from "react";
import herosect from "../../../assets/fintribe 1.png";
import logo from "../../../assets/fintribelogo.png";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import CustomInput, {
  SocialButton,
} from "../(components)/Authcomp/custominput"; // Adjust path as needed

const Login = () => {
  const nav = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login data:", formData);
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
              alt="FinTribe Hero Section"
              className="w-[20%] h-auto object-contain"
            />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800">Login</h2>
          <p className="text-sm text-gray-500 mb-6">
            Welcome back! Please sign in to your account.
          </p>

          {/* Social Buttons */}
          <div className="w-full flex flex-col sm:flex-row gap-3 items-center mb-6">
            <SocialButton icon={BsFacebook} className="text-blue-600">
              Facebook
            </SocialButton>
            <SocialButton icon={FcGoogle}>Google</SocialButton>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <CustomInput
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <CustomInput
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <button
              type="submit"
              className="w-full bg-[#0A2540] text-white py-2 rounded-lg font-medium hover:bg-[#1a3b5c] transition"
            >
              Sign In
            </button>
          </form>

          <div>
            <p className="text-sm text-gray-600 text-center mt-4">
              Don&lsquo;t have an account?{" "}
              <span
                onClick={() => nav.push("/auth/register")}
                className="text-[#226B44] cursor-pointer font-medium hover:underline"
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
