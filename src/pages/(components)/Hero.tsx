import React from "react";
import { LuShieldCheck } from "react-icons/lu";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineCompass } from "react-icons/ai";

const Hero = () => {
  return (
    <div
      className="w-full h-[60rem] flex flex-col"
      style={{
        background:
          "linear-gradient(to left, #CFE7DB, #E8EFF7, #FFFFFF, #FEFFFE, #FCFEFD)",
      }}
    >
      {/* Top Content Section */}
      <div className="flex w-full h-[80%] bg-amber-300">
        {/* Left Side */}
        <div className="w-1/2 h-full flex flex-col">
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
          <div className="flex justify-center items-center px-7 bg-red-500">
            <p className="text-5xl md:text-6xl font-bold leading-snug">
              Discover, Learn & Connect with{" "}
              <span className="text-[#2E8B57]">Trusted Investment</span>{" "}
              Opportunities
            </p>
          </div>

          {/* Subtext */}
          <div className="flex justify-center items-center px-7 mt-4">
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
        <div className="w-1/2 h-full bg-green-300"></div>
      </div>

      {/* Bottom Section */}
      <div className="w-full h-[20%] bg-blue-400"></div>
    </div>
  );
};

export default Hero;
