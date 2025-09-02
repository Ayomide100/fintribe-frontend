import Image from "next/image";
import React, { useEffect, useState } from "react";
import herosect from "../../../assets/fintribe 1.png";
import logo from "../../../assets/fintribelogo.png";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import CustomInput, {
  SocialButton,
} from "../(components)/Authcomp/custominput"; // Adjust path as needed
import { BiArrowBack, BiLoaderCircle } from "react-icons/bi";
import axios from "@/config/axiosconfig";
import Head from "next/head";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const nav = useRouter();

  const [account_type, setAccountType] = useState<string | null>(null);

  useEffect(() => {
    const storedType = localStorage.getItem("account_type");
    if (storedType) {
      setAccountType(storedType);
      setFormData((prev) => ({
        ...prev,
        account_type: storedType,
      }));
    }
  }, []);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    account_type: "",
  });

  const [loading, setloading] = useState(false);

  const router = useRouter();

  type Errors = {
    fullname?: string;
    email?: string;
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

    if (!formData.fullname.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);

    const loadingId = toast.loading("Creating your account...");

    if (!validateForm()) return;

    try {
      const { confirmPassword, ...payload } = formData;
      console.log(confirmPassword);

      const res = await axios.post("/users/sign-up", payload);

      console.log("Registration successful:", res.data);
      localStorage.setItem("token", res.data.content.token);
      toast.success("Registration successful!");
      setTimeout(() => {
        setFormData({
          fullname: "",
          email: "",
          password: "",
          confirmPassword: "",
          account_type: "",
        });
        router.push("/auth/verifyemail");
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
      toast.dismiss(loadingId);
    }
  };

  // console.log(account_type);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <title> FinTribe || Register </title>
      </Head>

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

            <div className="py-5" onClick={() => nav.push("/auth/select")}>
              <p className="flex items-center gap-2 font-medium text-[#226B44] cursor-pointer">
                <BiArrowBack /> Change Role
              </p>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome esteemed{" "}
              <span className="text-[#2E8B57] uppercase">{account_type}</span>
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
                label="Full Name"
                type="text"
                name="fullname"
                placeholder="Enter your Full Name"
                value={formData.fullname}
                onChange={handleInputChange}
                error={errors.fullname}
                required
              />

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
                disabled={loading}
                className="w-full bg-[#0A2540] text-white py-2 rounded-lg font-medium hover:bg-[#1a3b5c] transition"
              >
                {loading ? (
                  <span className="flex justify-center text-white items-center">
                    <BiLoaderCircle className="mr-2 animate-spin" size={22} />
                  </span>
                ) : (
                  <span>Sign Up</span>
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
                  login
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
    </>
  );
};

export default Register;
