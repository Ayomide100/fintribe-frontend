/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "@/config/axiosconfig";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import Image from "next/image";
import noface from "../../../../../assets/blank-profile-picture.webp";
import { TbLockAccess } from "react-icons/tb";

const Explore = () => {
  const router = useRouter();
  const { id } = router.query; // 👈 Get circleId from URL
  const [circle, setCircle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🟢 Fetch circle by ID
  const getCircleById = async (circleId: string) => {
    try {
      const res = await axios.get(`/circle/single?circleId=${circleId}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setCircle(res.data.content.circle);
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
      setLoading(false);
    }
  };

  // 🟢 Join Circle
  const handleJoinCircle = async (circleId: string) => {
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
      console.log(res);

      toast.success("Joined Successfully!");
      router.push("/explore"); // 👈 Go back after join
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

  useEffect(() => {
    if (id) getCircleById(id as string);
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!circle) return <p className="text-center mt-10">Circle not found.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-10 rounded-xl border border-gray-200 shadow-sm">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full border-2 border-[#226B44] overflow-hidden">
          <Image
            src={circle.icon?.url || "/default-circle.png"}
            alt={circle.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name + Members */}
      <h2 className="text-center text-lg font-semibold text-gray-900 mb-2">
        {circle.name}
      </h2>
      <div className="flex items-center justify-center text-sm text-gray-600 mb-2 gap-1">
        Members • {circle.totalMembers}{" "}
        <TbLockAccess className="text-[#226B44]" size={16} />
      </div>
      <p className="text-center text-sm text-gray-600 mb-4">
        {circle.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {circle.tags?.map((tag: string, i: number) => (
          <span
            key={i}
            className="px-4 py-1.5 border border-[#226B44] text-[#226B44] text-sm font-medium rounded-full bg-transparent hover:bg-[#226B4410] transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Top Members */}
      <div className="flex justify-center items-center -space-x-3 mb-6">
        {circle.topMembers?.slice(0, 3).map((member: any, i: number) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#2E8B57]"
          >
            <Image
              src={member.avatar?.url || noface}
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

      {/* Join Button */}
      <button
        onClick={() => handleJoinCircle(circle._id)}
        className="w-full bg-[#0A2540] text-white py-2 rounded-lg font-medium hover:bg-[#1a3b5c] transition text-sm"
      >
        Join Circle →
      </button>
    </div>
  );
};

export default Explore;
