/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Compass } from "lucide-react";
import Image from "next/image";
import firstone from "../../../assets/187817fe37210c2e0093099c360898510851d788.jpg";
import secondone from "../../../assets/2e1363bd7bba50ad27e636dd5baf25554019cbc6.jpg";
import thirdone from "../../../assets/b05c727f512f42114b5172a761b9bec8cb0ddab0.jpg";
import fourthone from "../../../assets/fa3ade4848a2f80ff7721bbdbe3f2d9fe32d2b66.jpg";

import firstavatar from "../../../assets/415d4678cf8060fd7cd2737b18c9f1d6805aea67.jpg";
import secondavatar from "../../../assets/96befc06bcc1cfd2e6a85064de0253f03354026a.jpg";
import thirdavatar from "../../../assets/a2c6e6d0de7c64b0e95e9bf35274ad5bae26def3.jpg";
// import fourthavatar from "../../../assets/d072c25443f441b7143033251e6b7d2148a98433.jpg";
// import fifthavatar from "../../../assets/d6ba5d2dff9956fe63003cdfa60cb70b5c67cf56.jpg";
import { TbLockAccess } from "react-icons/tb";

const circles = [
  {
    title: "Young NG Investors circle",
    members: "300",
    desc: "A community of beginner-to-intermediate investors sharing daily stock tips and strategies.",
    tags: ["Real Estate", "Bonds", "Stocks"],
    images: [firstone, secondone, thirdone, fourthone],
    avatar: firstavatar,
  },
  {
    title: "Young NG Investors circle",
    members: "300",
    desc: "A community of beginner-to-intermediate investors sharing daily stock tips and strategies.",
    tags: ["Real Estate", "Bonds", "Stocks"],
    images: [firstone, secondone, thirdone, fourthone],
    avatar: secondavatar,
  },
  {
    title: "Young NG Investors circle",
    members: "300",
    desc: "A community of beginner-to-intermediate investors sharing daily stock tips and strategies.",
    tags: ["Real Estate", "Bonds", "Stocks"],
    images: [firstone, secondone, thirdone, fourthone],
    avatar: thirdavatar,
  },
];

const InvestorCard = ({ circle }: any) => {
  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col justify-between hover:shadow-md transition 
    min-w-[80%] sm:min-w-[280px] md:w-[340px] md:h-[360px]"
    >
      <div className="w-full h-[40%]  rounded-full flex justify-center items-center">
        <div className="w-12 h-12 rounded-full bg-[#0A2540] flex items-center justify-center text-xs font-medium text-white border-2 border-[#226B44]">
          <Image
            src={circle.avatar}
            alt="avatar"
            className="w-full h-full rounded-full"
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center flex-col ">
        <h3 className="font-semibold text-gray-900 mb-1">{circle.title}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          Members • {circle.members} •{" "}
          <TbLockAccess className="text-[#2E8B57]" size={25} />
        </div>
        <p className="text-sm text-gray-600 mb-3 text-center">{circle.desc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {circle.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="px-3 py-1 border border-[#2E8B57] text-[#2E8B57] rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Avatars */}
        <div className="flex justify-center items-center -space-x-3 mb-4">
          {circle.images.map((img: string, i: number) => (
            <Image
              key={i}
              src={img}
              alt="member"
              className="w-10 h-10 rounded-full border-2 border-[#2E8B57]"
            />
          ))}
          <div className="w-10 h-10 rounded-full bg-[#0A2540] flex items-center justify-center text-xs font-medium text-white border-2 border-white">
            +295
          </div>
        </div>
      </div>

      {/* Button */}
      <button className="w-full bg-[#0A2540] text-white py-2 rounded-lg font-medium hover:bg-[#1a3b5c] transition text-sm">
        Join Circle →
      </button>
    </div>
  );
};

const Investors = () => {
  return (
    <div className="w-full bg-white py-12">
      {/* Header */}
      <div className="w-full flex justify-between items-center px-4 md:px-8 mb-8">
        <div
          className=" px-2 
         md:w-[46%] w-[90%]"
        >
          <p className="text-sm font-medium">Investment Circles</p>
          <p className="font-semibold md:text-2xl text-xl text-[#2E8B57]">
            Grow Together, Invest Smarter
          </p>
          <p className="text-sm text-[#6E6E6E]">
            Join like-minded investors in private circles where you can share
            opportunities, discuss strategies, and collaborate to achieve your
            financial goals.
          </p>
        </div>
        <div className="hidden md:flex">
          <button className="border border-[#2E8B57] font-medium text-[#2E8B57] py-2 px-4 rounded flex items-center gap-2">
            View all <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="flex md:hidden gap-4 overflow-x-auto px-4 scrollbar-hide">
        {circles.map((circle, i) => (
          <InvestorCard key={i} circle={circle} />
        ))}
      </div>

      {/* Desktop: flexbox instead of grid */}
      <div className="hidden md:flex flex-wrap gap-6 justify-center px-6">
        {circles.concat(circles).map((circle, i) => (
          <InvestorCard key={i} circle={circle} />
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="flex md:hidden w-full h-[5rem] mt-9 justify-center items-center">
        <button className="border border-[#2E8B57] font-medium text-[#2E8B57] py-2 px-28 rounded-2xl flex items-center gap-2">
          View all <Compass className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Investors;
