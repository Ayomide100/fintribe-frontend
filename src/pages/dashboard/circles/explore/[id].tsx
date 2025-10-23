/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "@/config/axiosconfig";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import Image from "next/image";
import Dashboardlayouts from "@/pages/layouts/Dashboardlayouts";
import { FaUsers } from "react-icons/fa";
import { TbLockAccess } from "react-icons/tb";
import { ChevronLeft } from "lucide-react";

const Explore = () => {
  const router = useRouter();
  const { id } = router.query;
  const [circle, setCircle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getCircleById = async (circleId: string) => {
    try {
      const res = await axios.get(`/circle/single?circleId=${circleId}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setCircle(res.data.content);
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
      toast.success("Joined Successfully!");
      router.push("/explore");
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
    <Dashboardlayouts>
      <div className="w-full py-2 px-6 mt-4 flex justify-start items-center">
        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard/circles")}
          className="text-sm text-gray-600 hover:text-[#226B44] mb-4 flex justify-center items-center rounded-md py-2 px-7 bg-[#84C2A229]"
        >
          <ChevronLeft /> Explore Circles
        </button>
      </div>
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
              <Image
                src={circle.icon?.url || "/default-circle.png"}
                alt={circle.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {circle.name}
              </h2>
              <p className="text-sm text-gray-500">
                By {circle.members?.[0]?.user?.fullname || "Unknown"}
              </p>
            </div>
          </div>

          <div className="text-right">
            <h3 className="text-lg font-semibold text-[#0A2540]">
              ₦{circle.accessFee?.amount || 0}
            </h3>
            <p className="text-xs text-gray-500">One-Time Access</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border border-gray-200 rounded-lg py-3 flex flex-col items-center justify-center">
            <FaUsers className="text-[#226B44] mb-1" />
            <p className="text-lg font-semibold">{circle.totalMembers}</p>
            <p className="text-sm text-gray-600">Members</p>
          </div>
          <div className="border border-gray-200 rounded-lg py-3 flex flex-col items-center justify-center">
            <TbLockAccess className="text-[#226B44] mb-1" />
            <p className="text-lg font-semibold capitalize">
              {circle.type || "public"}
            </p>
            <p className="text-sm text-gray-600">Access</p>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mb-6">
          <h4 className="font-semibold text-gray-800 mb-2">
            Circle Description
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {circle.description || "No description provided."}
          </p>
        </div>

        {/* Join Button */}
        <button
          onClick={() => handleJoinCircle(circle._id)}
          className="w-full bg-[#0A2540] text-white py-3 rounded-lg font-medium hover:bg-[#1a3b5c] transition"
        >
          Join & Pay ₦{circle.accessFee?.amount || 0}
        </button>
      </div>
    </Dashboardlayouts>
  );
};

export default Explore;
