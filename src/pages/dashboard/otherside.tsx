import React from "react";
import { Star, ShieldCheck, TrendingUp } from "lucide-react";
import { HiOutlineUserAdd } from "react-icons/hi";
import suitguy from "../../../assets/suitguy.jpg";
import haijya from "../../../assets/hajiya.jpg";
import firstone from "../../../assets/187817fe37210c2e0093099c360898510851d788.jpg";
import secondone from "../../../assets/2e1363bd7bba50ad27e636dd5baf25554019cbc6.jpg";
import fourthone from "../../../assets/fa3ade4848a2f80ff7721bbdbe3f2d9fe32d2b66.jpg";
import Image from "next/image";
import { TbLockAccess } from "react-icons/tb";
import { TbFidgetSpinner } from "react-icons/tb";

const Otherside = () => {
  const gurus = [
    {
      name: "Adelaide Thompson",
      role: "Real Estate Expert",
      xp: "2.4k",
      image: haijya,
    },
    {
      name: "Adelaide Thompson",
      role: "Real Estate Expert",
      xp: "2.4k",
      image: suitguy,
    },
    {
      name: "Adelaide Thompson",
      role: "Real Estate Expert",
      xp: "2.4k",
      image: suitguy,
    },
  ];

  const circles = [
    {
      name: "Lagos Property Investors",
      members: "32.2k",

      image: firstone,
    },
    {
      name: "Lagos Property Investors",
      members: "32.2k",

      image: secondone,
    },
    {
      name: "Lagos Property Investors",
      members: "32.2k",

      image: fourthone,
    },
  ];

  return (
    <div className="w-full h-full overflow-y-auto px-3 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      {/* Suggested Gurus */}
      <div className="bg-white rounded-lg shadow-md p-3 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Star className="w-4 h-4 text-yellow-500" /> Suggested Gurus
        </h2>
        {gurus.map((guru, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-lg py-2"
          >
            {/* Left: Avatar + Info */}
            <div className="flex w-[90%] items-center  justify-around">
              <div className="">
                <Image
                  src={guru.image}
                  alt={guru.name}
                  className="w-10 h-10 rounded-full border-4 border-[#226B44]  object-cover"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-[12px]">{guru.name}</p>
                  <ShieldCheck size={14} className="text-[#226B44]" />
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <p>{guru.role}</p>
                  <span className="text-[#2E8B57] font-medium">{guru.xp}</span>
                </div>
              </div>
            </div>

            {/* Follow Button */}
            <button className="px-3 py-1 flex items-center gap-1 bg-[#0A2540] text-white rounded-md text-xs">
              <HiOutlineUserAdd size={14} />
              Follow
            </button>
          </div>
        ))}
        <button className="text-xs border rounded-md border-[#226B44] py-2 font-medium text-[#226B44] w-full">
          View all Gurus
        </button>
      </div>

      {/* Join Circles */}
      <div className="bg-white rounded-lg shadow-md p-3 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <TbFidgetSpinner className="w-4 h-4 text-green-600" /> Join Circles
        </h2>
        {circles.map((circle, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-lg px-2 py-2"
          >
            <div className="">
              <Image
                src={circle.image}
                alt={circle.name}
                className="w-10 h-10 rounded-full border-4 border-[#226B44]  object-cover"
              />
            </div>

            <div>
              <p className="font-medium text-xs">{circle.name}</p>
              <p className="text-xs text-gray-500">
                <TbLockAccess className="inline-block w-4 h-4 mr-1 text-[#226B44]" />
                • {""}
                {circle.members} Members
              </p>
            </div>
            <button className="px-3 py-1 bg-[#0A2540] text-white rounded-md text-xs">
              Join
            </button>
          </div>
        ))}
        <button className="text-xs border border-[#226B44] py-2 rounded-md font-medium text-[#226B44] w-full">
          Explore Circles
        </button>
      </div>

      {/* Featured Opportunity */}
      <div className="bg-white rounded-xl shadow-lg p-4 max-w-sm">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <span className="text-gray-600 font-medium text-sm">
            Featured Opportunity
          </span>
        </div>

        {/* Company Info */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-800">Green Energy</h3>
            <ShieldCheck className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-xs text-gray-500 mb-3">SolarVest Nigeria</p>

          {/* Investment Details */}
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-2xl font-bold text-gray-800">18–22%</div>
              <div className="text-xs text-gray-500">Expected ROI</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-700">
                24 months
              </div>
              <div className="text-xs text-gray-500">Duration</div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium text-sm text-gray-700">4.6</span>
            <span className="text-xs text-gray-500">(234 investors)</span>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-3">
            <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-xs font-medium">
              Real Estate
            </span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
              low Risk
            </span>
          </div>

          {/* Minimum Investment */}
          <div className="text-xs text-gray-600 mb-4">
            Min. Investment: <span className="font-semibold">₦250,000</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center gap-2">
          View Details
          <TrendingUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Otherside;
