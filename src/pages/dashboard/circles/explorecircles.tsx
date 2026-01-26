/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";

import Image from "next/image";
import { TbLockAccess } from "react-icons/tb";
import noface from "../../../../assets/blank-profile-picture.webp";
import { useRouter } from "next/router";
import { Bookmark } from "lucide-react";
import axios from "@/config/axiosconfig";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

type Props = {
  circle: any;
  onToggleSave: (
    circleId: string,
    isSaved?: boolean,
    savedItemId?: string | null,
  ) => void;
};

const InvestorCard = ({ circle, onToggleSave }: Props) => {
  const router = useRouter();

  return (
    <div
      className="
        bg-white border border-gray-200 rounded-xl
        w-[300px] h-[300px]
        flex flex-col justify-between
        p-5 hover:shadow-md transition
      "
    >
      {/* ───────── Top Content ───────── */}
      <div>
        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#226B44]">
            <Image
              src={circle.icon?.url || "/default-circle.png"}
              alt="circle icon"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-center font-semibold text-gray-900">
          {circle.name}
        </h3>

        {/* Members */}
        <div className="flex justify-center items-center gap-1 text-xs text-gray-600 mt-1">
          Members • {circle.totalMembers}
          <TbLockAccess className="text-[#2E8B57]" size={16} />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 text-center mt-2 line-clamp-2">
          {circle.description}
        </p>
        {/* Top Members Avatars */}
        {circle.topMembers?.length > 0 && (
          <div className="flex justify-center mt-3">
            <div className="flex items-center">
              {circle.topMembers
                .slice(0, 3)
                .map((member: any, index: number) => (
                  <div
                    key={member._id}
                    className={`w-8 h-8 rounded-full border-2 border-white overflow-hidden ${
                      index !== 0 ? "-ml-3" : ""
                    }`}
                    title={member.name}
                  >
                    <Image
                      src={member.avatar?.url || noface}
                      alt={member.name}
                      width={90}
                      height={90}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}

              {/* Remaining Count */}
              {circle.remainingCount > 0 && (
                <div className="-ml-3 w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-semibold text-gray-700">
                  +{circle.remainingCount}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {circle.tags?.slice(0, 2).map((tag: string, i: number) => (
            <span
              key={i}
              className="px-3 py-1 text-xs border border-[#226B44] text-[#226B44] rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ───────── Bottom Actions ───────── */}
      <div className="flex gap-2 mt-4">
        {/* Join */}
        <button
          onClick={() =>
            router.push(`/dashboard/circles/explore/${circle._id}`)
          }
          className="flex-1 bg-[#0A2540] text-white py-2 rounded-lg text-sm hover:bg-[#1a3b5c] transition"
        >
          Join
        </button>

        {/* Bookmark */}
        <button
          onClick={() =>
            onToggleSave(circle._id, circle.isSaved, circle.savedItemId)
          }
          className={`
            w-11 flex items-center justify-center rounded-lg border
            transition
            ${
              circle.isSaved
                ? "bg-[#226B44]/10 border-[#226B44]"
                : "border-gray-300 hover:border-[#226B44]"
            }
          `}
        >
          <Bookmark
            size={18}
            className={
              circle.isSaved ? "fill-[#226B44] text-[#226B44]" : "text-gray-500"
            }
          />
        </button>
      </div>
    </div>
  );
};

const EmptyExploreState = () => {
  // const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-full bg-[#226B44]/10 flex items-center justify-center mb-4">
        <TbLockAccess size={36} className="text-[#226B44]" />
      </div>

      <h2 className="text-xl font-semibold text-gray-900">
        You’ve joined all circles 🎉
      </h2>

      <p className="text-gray-600 mt-2 max-w-sm">
        You’re currently a member of every available circle. You can manage the
        circles you’ve joined. Kindly check your joined circles for more
      </p>

      {/* <div className="flex gap-3 mt-6">
        <button
          onClick={() => router.push("/dashboard/circles")}
          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:border-gray-400 transition"
        >
          My Circles
        </button>
      </div> */}
    </div>
  );
};

const Explorecircles = () => {
  const [circles, setCircles] = useState<any[]>([]);

  const toggleSaveCircles = async (
    circleId: string,
    isSaved?: boolean,
    savedItemId?: string | null,
  ) => {
    try {
      const token = localStorage.getItem("token");

      if (isSaved && savedItemId) {
        await axios.delete(`/saved/${savedItemId}`, {
          data: { type: "Circle" },
          headers: { Authorization: `${token}` },
        });
      } else {
        const res = await axios.post(
          `/saved/${circleId}`,
          { type: "Circle" },
          { headers: { Authorization: `${token}` } },
        );

        savedItemId = res.data.content?._id;
      }

      // 🔥 Optimistic update
      setCircles((prev) =>
        prev.map((circle) =>
          circle._id === circleId
            ? {
                ...circle,
                isSaved: !isSaved,
                savedItemId: isSaved ? null : savedItemId,
              }
            : circle,
        ),
      );

      toast.success(isSaved ? "Removed from saved circles" : "Circle saved");
    } catch (error) {
      console.error("bookmark error:", error);
      toast.error("Failed to update bookmark");
    }
  };

  const getAllCircles = async () => {
    try {
      const res = await axios.get("circle?page=1&limit=6", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      const fetched = res.data.content.circles;

      const filtered = fetched
        .filter((circle: any) => !circle.hasJoined)
        .map((circle: any) => ({
          ...circle,
          isSaved: circle.isSaved ?? false,
          savedItemId: circle.savedItemId ?? null,
        }));

      setCircles(filtered);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error loading circles");
      }
    }
  };

  useEffect(() => {
    getAllCircles();
  }, []);

  return (
    <div className="w-full h-full bg-gray-50 overflow-y-scroll">
      {circles.length === 0 ? (
        <EmptyExploreState />
      ) : (
        <div className="flex flex-wrap gap-6 justify-center p-4">
          {circles.map((circle) => (
            <InvestorCard
              key={circle._id}
              circle={circle}
              onToggleSave={toggleSaveCircles}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explorecircles;
