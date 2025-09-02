import React from "react";
import { Star, Briefcase, ShieldCheck } from "lucide-react";
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
      <div className="bg-white rounded-lg shadow-md p-3 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Briefcase className="w-4 h-4 text-purple-600" /> Featured Opportunity
        </h2>
        <div className="rounded-lg p-3 space-y-2 bg-gray-50">
          <p className="font-medium text-sm">Green Energy</p>
          <p className="text-xs text-gray-500">Real Estate Program</p>
          <p className="text-sm font-bold text-green-600">18–22%</p>
          <p className="text-xs text-gray-400">Duration: 24 months</p>
          <button className="w-full py-2 bg-[#0A2540] text-white rounded-md text-xs">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otherside;
