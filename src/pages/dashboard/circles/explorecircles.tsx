/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TbLockAccess } from "react-icons/tb";
import axios from "@/config/axiosconfig";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

const InvestorCard = ({ circle }: any) => {
  const HandleJoincircle = async (circleId: string) => {
    const loadingId = toast.loading("Joining...");

    try {
      const res = await axios.post(
        `/circle/${circleId}/join`,
        {},
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(res.data);
      getAllCircles();
      toast.success("Joined Successfully....");
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        const apiError = error.response?.data?.error;
        const fallback = error.message || "An unexpected error occurred";

        const errorMsg =
          `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
          fallback;

        toast.error(errorMsg);
      }
    } finally {
      toast.dismiss(loadingId);
    }
  };

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col justify-between hover:shadow-md transition
        w-full sm:w-[280px] md:w-[300px] lg:w-[320px] h-auto"
    >
      {/* Circle Icon */}
      <div className="w-full flex justify-center mb-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#226B44]">
          <Image
            src={circle.icon?.url || "/default-circle.png"}
            alt="circle icon"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Title + Members */}
      <div className="text-center">
        <h3 className="font-semibold text-gray-900 mb-1">{circle.name}</h3>
        <div className="flex items-center justify-center text-sm text-gray-600 mb-2 gap-1">
          Members • {circle.totalMembers}{" "}
          <TbLockAccess className="text-[#2E8B57]" size={18} />
        </div>
        <p className="text-sm text-gray-600 mb-3">{circle.description}</p>
      </div>

      {/* Top Members */}
      <div className="flex justify-center items-center -space-x-3 mb-4">
        {circle.topMembers?.slice(0, 3).map((member: any, i: number) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#2E8B57]"
          >
            <Image
              src={member.avatar?.url || ""}
              alt={member.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {circle.remainingCount > 0 && (
          <div className="w-10 h-10 rounded-full bg-[#0A2540] flex items-center justify-center text-xs font-medium text-white border-2 border-white">
            +{circle.remainingCount}
          </div>
        )}
      </div>

      {/* Button */}
      <button
        onClick={() => HandleJoincircle(circle._id)}
        className="w-full bg-[#0A2540] text-white py-2 rounded-lg font-medium hover:bg-[#1a3b5c] transition text-sm"
      >
        Join Circle →
      </button>
    </div>
  );
};

const Explorecircles = () => {
  const [circles, setCircles] = useState<any[]>([]);

  const getAllCircles = async () => {
    try {
      const res = await axios.get("circle?page=1&limit=6", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      setCircles(res.data.content.circles);
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        const apiError = error.response?.data?.error;
        const fallback = error.message || "An unexpected error occurred";

        const errorMsg =
          `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
          fallback;

        toast.error(errorMsg);
      }
    }
  };

  useEffect(() => {
    getAllCircles();
  }, []);

  return (
    <div className="w-full h-full flex flex-wrap gap-6 justify-center items-start p-4 bg-gray-50 overflow-y-scroll">
      {circles.map((circle) => (
        <InvestorCard key={circle._id} circle={circle} />
      ))}
    </div>
  );
};

export default Explorecircles;
function getAllCircles() {
  throw new Error("Function not implemented.");
}
