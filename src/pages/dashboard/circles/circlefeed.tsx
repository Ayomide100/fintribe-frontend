/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "@/config/axiosconfig";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import CirclePostCard from "./circlepostcard";

const CircleFeed = ({ selectedCircle, getTimeAgo }: any) => {
  const [circlePosts, setCirclePosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const getCirclePosts = async (circleId: string) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/circle/post?circleId=${circleId}&page=1&limit=5`,
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );
      setCirclePosts(res.data.content.posts || []);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Failed to load circle posts");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCircle?._id) getCirclePosts(selectedCircle._id);
  }, [selectedCircle, reloadTrigger]);

  const handleReload = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  return (
    <div className="flex-1 space-y-6">
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-200 border-t-green-600"></div>
        </div>
      ) : circlePosts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg font-medium">No posts yet</p>
          <p className="text-gray-400 text-sm mt-1">
            Be the first to share something!
          </p>
        </div>
      ) : (
        circlePosts.map((post: any) => (
          <CirclePostCard
            key={post._id}
            post={post}
            selectedCircle={selectedCircle}
            getTimeAgo={getTimeAgo}
            refreshPosts={handleReload}
          />
        ))
      )}
    </div>
  );
};

export default CircleFeed;
