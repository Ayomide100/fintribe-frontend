/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { TbFidgetSpinner, TbLockAccess } from "react-icons/tb";

type Props = {
  isMobile: boolean;
  myCircles: any[];
  selectedCircle: any;
  setSelectedCircle: (circle: any) => void;
};

const CircleSidebar = ({
  isMobile,
  myCircles,
  selectedCircle,
  setSelectedCircle,
}: Props) => (
  <div className={`${isMobile ? "w-full" : "w-80"} flex-shrink-0`}>
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <TbFidgetSpinner className="text-green-600" size={24} />
        <h2 className="font-semibold text-base">Joined Circles</h2>
      </div>
      <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
        {myCircles.map((circle) => (
          <div
            key={circle._id}
            onClick={() => setSelectedCircle(circle)}
            className={`p-4 hover:bg-gray-50 cursor-pointer ${
              selectedCircle?._id === circle._id ? "bg-green-50" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-[50px] h-[50px] border-2 border-[#226B44] rounded-full flex justify-center items-center">
                <Image
                  src={circle.icon?.url || "/default-circle.png"}
                  alt={circle.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{circle.name}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <TbLockAccess className="inline-block w-4 h-4 text-[#226B44]" />
                  {circle.totalMembers} Members
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CircleSidebar;
