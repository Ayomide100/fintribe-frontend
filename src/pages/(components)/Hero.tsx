import React from "react";
import { LuShieldCheck } from "react-icons/lu";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineCompass } from "react-icons/ai";
import heroimg from "../../../assets/fintribe 1.png";
import Image from "next/image";
import { VscVerified } from "react-icons/vsc";
import { FiUsers } from "react-icons/fi";
import { PiChartLineUp } from "react-icons/pi";
import { useRouter } from "next/router";

const Hero = () => {
  const nav = useRouter();

  return (
    <div
      className="w-full md:h-[47rem] h-[45rem] flex flex-col pt-[10vh]"
      style={{
        background:
          "linear-gradient(to left, #CFE7DB, #E8EFF7, #FFFFFF, #FEFFFE, #FCFEFD)",
      }}
    >
      {/* Top Content Section */}
      <div className="flex flex-col md:flex-row w-full h-auto md:h-[80%]">
        {/* Left Side */}
        <div className="w-full md:w-1/2 flex flex-col px-4 md:px-8">
          {/* Trusted Badge */}
          <div className="flex md:justify-start justify-center items-center py-4">
            <div className="flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-[#C8E4D6]">
              <LuShieldCheck className="text-[#2E8B57]" size={20} />
              <p className="text-xs sm:text-sm text-[#226B44] font-medium">
                Trusted by 1000+ Nigerian Investors
              </p>
            </div>
          </div>

          {/* Main Heading */}
          <div className=" md:text-start text-center md:py-0 py-4">
            <p className="text-[26px] sm:text-2xl md:text-5xl font-bold leading-snug">
              <span className="whitespace-nowrap">
                Discover, Learn & Connect
              </span>{" "}
              with <span className="text-[#2E8B57]">Trusted Investment</span>{" "}
              Opportunities
            </p>
          </div>

          {/* Subtext */}
          <div className="flex justify-center md:text-start text-center items-center mt-4">
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Join Nigeria&apos;s premier social investment platform. Connect
              with vetted opportunities, learn from trusted gurus, and build
              wealth alongside a community that understands your journey.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
            <button
              onClick={() => nav.push("/auth/register")}
              className="py-3 px-6 sm:px-8 flex items-center justify-center gap-2 bg-[#0A2540] hover:bg-[#0e3358] text-white rounded-md text-sm sm:text-base"
            >
              Join FinTribe Today <BsArrowRight />
            </button>
            <button className="py-3 px-6 border text-[#2E8B57] flex items-center justify-center gap-2 hover:text-white hover:bg-[#2E8B57] transition-all duration-300 rounded-md border-[#2E8B57] text-sm sm:text-base">
              Explore Communities <AiOutlineCompass />
            </button>
          </div>
        </div>

        {/* Right Side (Image Placeholder) */}
        <div className="w-1/2 h-full hidden  md:flex justify-center items-center">
          <div className="w-[70%] h-[70%] bg-[#53A77B] rounded-3xl relative">
            <Image
              src={heroimg}
              alt="heroimage"
              className="absolute top-5 right-6"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full h-[60%]  md:h-[20%] flex items-center justify-center flex-col-reverse md:flex-col">
        <div className="w-full h-[45%]  md:h-[40%] flex justify-between items-center px-0 md:px-10">
          <div className="w-[30%]  flex justify-center flex-col  md:items-center items-start h-[90%] md:w-[10%]">
            <div className="w-full h-[40%] gap-2 flex justify-center items-center">
              <VscVerified className="text-[#2E8B57]" size={24} />
              <p className=" font-bold text-lg ">500+</p>
            </div>
            <span className="text-sm w-full flex justify-center items-center">
              Verified Gurus
            </span>
          </div>
          <div className="w-[30%]  flex justify-center flex-col  items-center h-[90%] md:w-[10%]">
            <div className="w-full h-[40%] gap-2 flex justify-center items-center">
              <FiUsers className="text-[#17A2B8]" size={24} />
              <p className=" font-bold text-lg ">95%</p>
            </div>
            <span className="md:text-sm text-xs  w-full flex justify-center items-center">
              User Satisfaction
            </span>
          </div>
        </div>
        <div className="w-[100%]   flex justify-center flex-col items-center h-[40%] md:h-[35%]">
          <div className="w-full h-[40%]  gap-2 flex justify-center items-center">
            <PiChartLineUp className="text-[#FFCC00]" size={24} />
            <p className=" font-bold text-lg ">₦50B+</p>
          </div>
          <span className="text-sm w-full flex justify-center items-center">
            Investment Opportunities
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
