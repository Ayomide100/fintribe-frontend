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
import { BiArrowBack } from "react-icons/bi";

const Register = () => {
  const nav = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  type Errors = {
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    [key: string]: string | undefined;
  };
  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle registration logic here
      console.log("Register data:", formData);
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
              alt="FinTribe Hero Section"
              className="w-[20%] h-auto object-contain"
            />
          </div>
          <div className=" py-5" onClick={() => nav.push("/auth/select")}>
            <p className="flex items-center gap-2 font-medium text-[#226B44] cursor-pointer">
              <BiArrowBack /> Change Role
            </p>
          </div>
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome esteemed Investor/User 
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Let&lsquo;s get you started on your finTribe journey
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
              error={errors.email}
              required
            />

            <CustomInput
              label="Phone"
              type="tel"
              name="phone"
              placeholder="Enter your Phone number"
              value={formData.phone}
              onChange={handleInputChange}
              error={errors.phone}
              required
            />

            <CustomInput
              label="Password"
              type="password"
              name="password"
              placeholder="Create your password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              required
            />

            <CustomInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              required
            />

            <button
              type="submit"
              className="w-full bg-[#0A2540] text-white py-2 rounded-lg font-medium hover:bg-[#1a3b5c] transition"
            >
              Sign Up
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

      {/* Right Section - Image (Hidden on Mobile) */}
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

export default Register;
