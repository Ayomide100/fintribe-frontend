import React from "react";
import { LuShieldCheck } from "react-icons/lu";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineCompass } from "react-icons/ai";
import heroimg from "../../../assets/fintribe 1.png";
import Image from "next/image";
import { VscVerified } from "react-icons/vsc";
import { FiUsers } from "react-icons/fi";
import { PiChartLineUp } from "react-icons/pi";

const Hero = () => {
  return (
    <div
      className="w-full h-[47rem] flex flex-col pt-[10vh]"
      style={{
        background:
          "linear-gradient(to left, #CFE7DB, #E8EFF7, #FFFFFF, #FEFFFE, #FCFEFD)",
      }}
    >
      {/* Top Content Section */}
      <div className="flex w-full h-[80%]">
        {/* Left Side */}
        <div className="w-1/2 h-full flex flex-col px-2">
          {/* Trusted Badge */}
          <div className="flex justify-start items-center px-8 py-6">
            <div className="flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-[#C8E4D6]">
              <LuShieldCheck className="text-[#2E8B57]" size={22} />
              <p className="text-sm text-[#226B44] font-medium">
                Trusted by 1000+ Nigerian Investors
              </p>
            </div>
          </div>

          {/* Main Heading */}
          <div className="flex  justify-start items-center px-6">
            <p className="text-5xl font-bold leading-snug ">
              <span className="whitespace-nowrap">
                Discover, Learn & Connect
              </span>{" "}
              with <span className="text-[#2E8B57]">Trusted Investment</span>{" "}
              Opportunities
            </p>
          </div>

          {/* Subtext */}
          <div className="flex justify-center  items-center px-7 mt-4">
            <p className="text-gray-700 leading-relaxed">
              Join Nigeria&apos;s premier social investment platform. Connect
              with vetted opportunities, learn from trusted gurus, and build
              wealth alongside a community that understands your journey.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 px-7 mt-6">
            <button className="py-3 px-8 flex items-center gap-2 bg-[#0A2540] hover:bg-[#0e3358] text-white rounded-md">
              Join FinTribe Today <BsArrowRight />
            </button>
            <button className="py-3 px-6 border text-[#2E8B57] flex items-center gap-2 hover:text-white hover:bg-[#2E8B57] transition-all duration-300 rounded-md border-[#2E8B57]">
              Explore Communities <AiOutlineCompass />
            </button>
          </div>
        </div>

        {/* Right Side (Image Placeholder) */}
        <div className="w-1/2 h-full  flex justify-center items-center">
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
      <div className="w-full h-[20%] ">
        <div className="w-full h-[45%] flex justify-between items-center px-10">
          <div className="w-[10%] flex justify-center flex-col items-center h-[90%]">
            <div className="w-full h-[40%] gap-2 flex justify-center items-center">
              <VscVerified className="text-[#2E8B57]" size={24} />
              <p className=" font-bold text-lg ">500+</p>
            </div>
            <span className="text-sm w-full flex justify-center items-center">
              Verified Gurus
            </span>
          </div>
          <div className="w-[10%] flex justify-center flex-col items-center h-[90%] ">
            <div className="w-full h-[40%] gap-2 flex justify-center items-center">
              <FiUsers className="text-[#17A2B8]" size={24} />
              <p className=" font-bold text-lg ">95%</p>
            </div>
            <span className="text-sm w-full flex justify-center items-center">
              User Satisfaction
            </span>
          </div>
        </div>
        <div className="w-[100%] flex justify-center flex-col items-center h-[55%]">
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
