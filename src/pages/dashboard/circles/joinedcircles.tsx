import React, { useState, useEffect } from "react";
import {
  EllipsisVertical,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  Settings,
} from "lucide-react";
import { TbFidgetSpinner, TbLockAccess } from "react-icons/tb";
import axios from "@/config/axiosconfig";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";

type Circle = {
  _id: string;
  name: string;
  icon?: { url: string };
  type?: string;
  totalMembers?: number;
  lastMessage?: { text: string };
};

type Post = {
  _id: string;
  author: { username: string };
  content: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  image?: { url: string };
};

const JoinedCircles = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [joinedCircles, setJoinedCircles] = useState<Circle[]>([]);
  const [circlePosts, setCirclePosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getUser = async () => {
    try {
      const res = await axios("/users/profile", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setAccountType(res.data.content.user.account_type);
    } catch (error) {
      if (isAxiosError(error)) {
        const msg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to fetch user";
        toast.error(msg);
      }
    }
  };

  const getAllJoinedCircles = async () => {
    try {
      const res = await axios.get("/circle/me?page=1&limit=6", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setJoinedCircles(res.data.content.circles);
    } catch (error) {
      if (isAxiosError(error)) {
        const msg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to fetch joined circles";
        toast.error(msg);
      }
    }
  };

  // ✅ Fetch posts for selected circle
  const fetchCirclePosts = async (circleId: string) => {
    setLoadingPosts(true);
    try {
      const res = await axios.get(`/circle/post?circleId=${circleId}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setCirclePosts(res.data.content.posts || []);
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
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    getAllJoinedCircles();
    getUser();
  }, []);

  // When a circle is selected, load its posts
  const handleSelectCircle = (circle: Circle) => {
    setSelectedCircle(circle);
    fetchCirclePosts(circle._id);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {selectedCircle ? (
              <div className="flex items-center gap-2">
                <div className="w-[50px] h-[50px] border-2 border-[#226B44] rounded-full flex justify-center items-center">
                  <Image
                    src={selectedCircle.icon?.url || "/default-circle.png"}
                    alt={selectedCircle.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
                <h1 className="text-lg font-semibold">{selectedCircle.name}</h1>
              </div>
            ) : (
              <p className="text-gray-500 italic">Tap a circle to view posts</p>
            )}

            <div className="flex gap-3">
              {accountType === "user" ? (
                <div className="bg-white  px-2 py-2 rounded-md">
                  <EllipsisVertical size={18} />
                </div>
              ) : (
                <>
                  <div className="bg-white shadow-md px-2 py-2 rounded-md">
                    <FiEdit size={18} />
                  </div>
                  <div className="bg-white shadow-md px-2 py-2 rounded-md">
                    <Settings size={18} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className={`flex ${isMobile ? "flex-col" : "gap-6"}`}>
          {/* Sidebar - Joined Circles */}
          <div className={`${isMobile ? "w-full mb-6" : "w-80"} flex-shrink-0`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                <TbFidgetSpinner className="text-green-600" size={24} />
                <h2 className="font-semibold text-base">Joined Circles</h2>
              </div>
              <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {joinedCircles.map((circle) => (
                  <div
                    key={circle._id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedCircle?._id === circle._id
                        ? "bg-green-50 border-l-4 border-green-500"
                        : ""
                    }`}
                    onClick={() => handleSelectCircle(circle)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-[50px] h-[50px] border-2 border-[#226B44] rounded-full flex justify-center items-center">
                        <Image
                          src={circle.icon?.url || "/default-circle.png"}
                          alt={circle.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover flex-shrink-0"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm truncate">
                            {circle.name}
                          </p>
                          {circle.type === "public" && (
                            <span className="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0"></span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <TbLockAccess className="inline-block w-4 h-4 mr-1 text-[#226B44]" />
                          {circle.totalMembers} Members
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feed - Posts */}
          <div className="flex-1 space-y-4">
            {loadingPosts ? (
              <p className="text-center text-gray-500 mt-10">
                Loading posts...
              </p>
            ) : circlePosts.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">
                {selectedCircle
                  ? "No posts yet in this circle."
                  : "Select a circle to view posts."}
              </p>
            ) : (
              circlePosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="p-4 flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 bg-green-200 rounded-full flex-shrink-0 flex items-center justify-center">
                        <span className="text-green-700 font-bold">
                          {post.author?.username?.[0]?.toUpperCase() || "U"}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">
                          {post.author?.username}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {new Date(post.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <EllipsisVertical size={18} className="text-gray-400" />
                  </div>

                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  {post.image?.url && (
                    <div className="relative">
                      <Image
                        src={post.image.url}
                        alt="Post Image"
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-b-lg object-cover"
                      />
                    </div>
                  )}

                  <div className="px-4 py-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm mb-3 text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <ThumbsUp size={16} />
                          {post.likesCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle size={16} />
                          {post.commentsCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 size={16} />
                          {post.sharesCount}
                        </span>
                      </div>
                      <Bookmark size={18} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinedCircles;
