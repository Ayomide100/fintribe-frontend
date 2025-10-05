import React, { useState, useEffect } from "react";
import { EllipsisVertical, Settings } from "lucide-react";
import { TbFidgetSpinner, TbLockAccess } from "react-icons/tb";
import axios from "@/config/axiosconfig";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import CreateCirclePost from "@/Modals/createcirclepost";

type Circle = {
  _id: string;
  name: string;
  icon?: { url: string };
  type?: string;
  totalMembers?: number;
  lastMessage?: { text: string };
};

const MyCircles = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);
  type CirclePost = {
    _id: string;
    title?: string;
    content: string;
    // Add other fields as needed, e.g. images, createdAt, etc.
  };

  const [circlePosts, setCirclePosts] = useState<CirclePost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    images: [] as File[],
    isPinned: false,
    isAnnouncement: false,
  });

  const [myCircles, setMyCircles] = useState<Circle[]>([]);
  const [accountType, setAccountType] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getAllMyCircles = async () => {
    try {
      const res = await axios.get("/circle/creator?page=1&limit=6", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      setMyCircles(res.data.content.circles);
    } catch (error) {
      if (isAxiosError(error)) {
        const msg =
          error.response?.data?.message || "Failed to load your circles";
        toast.error(msg);
      }
    }
  };

  const getUser = async () => {
    try {
      const res = await axios("/users/profile", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      setAccountType(res.data.content.user.account_type);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Failed to load user");
      }
    }
  };

  const getCirclePosts = async (circleId: string) => {
    try {
      setLoadingPosts(true);
      const res = await axios.get(
        `/circle/post?circleId=${circleId}&page=1&limit=5`,
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );
      setCirclePosts(res.data.content.posts || []);
    } catch (error) {
      if (isAxiosError(error)) {
        const msg =
          error.response?.data?.message || "Failed to load circle posts";
        toast.error(msg);
      }
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    getAllMyCircles();
    getUser();
    if (selectedCircle?._id) {
      getCirclePosts(selectedCircle._id);
    }
  }, [selectedCircle]);

  const handleCreatePost = async (circleId: string) => {
    if (!newPost.content.trim()) {
      toast.error("Post content is required");
      return;
    }

    const formData = new FormData();
    formData.append("content", newPost.content);
    if (newPost.title) formData.append("title", newPost.title);
    if (newPost.isPinned) formData.append("isPinned", "true");
    if (newPost.isAnnouncement) formData.append("isAnnouncement", "true");
    newPost.images.forEach((img) => formData.append("file", img));

    try {
      toast.loading("Creating post...");
      await axios.post(`/circle/post?circleId=${circleId}`, formData, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.dismiss();
      toast.success("Post created!");
      setShowCreateForm(false);
      setNewPost({
        title: "",
        content: "",
        images: [],
        isPinned: false,
        isAnnouncement: false,
      });
      getCirclePosts(circleId);
    } catch (error) {
      toast.dismiss();
      if (isAxiosError(error)) {
        const msg = error.response?.data?.message || "Failed to create post";
        toast.error(msg);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 relative">
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
                    className="rounded-full object-contain"
                  />
                </div>
                <h1 className="text-lg font-semibold">{selectedCircle.name}</h1>
              </div>
            ) : (
              <p className="text-gray-500 italic">Tap to view your circles</p>
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
                {myCircles.map((circle) => (
                  <div
                    key={circle._id}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedCircle(circle)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-[50px] h-[50px] border-2 border-[#226B44] rounded-full flex justify-center items-center">
                        <Image
                          src={circle.icon?.url || "/default-circle.png"}
                          alt={circle.name}
                          width={40}
                          height={40}
                          className=" rounded-full object-cover"
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
                          <TbLockAccess className="inline-block w-4 h-4 text-[#226B44]" />
                          {circle.totalMembers} Members
                        </p>
                        {circle.lastMessage && (
                          <p className="text-xs text-gray-400 truncate mt-1">
                            {circle.lastMessage.text}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feed Section */}
          <div className="flex-1 space-y-4">
            {loadingPosts ? (
              <p className="text-center text-gray-400 py-10">
                Loading posts...
              </p>
            ) : circlePosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-500 mb-4">
                  No posts yet in{" "}
                  <span className="font-semibold">{selectedCircle?.name}</span>
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-[#226B44] text-white text-sm px-5 py-2 rounded-md hover:bg-[#1B5736] transition"
                >
                  Create Post
                </button>
              </div>
            ) : (
              circlePosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="p-4">
                    <h3 className="font-semibold text-base">
                      {post.title || "Untitled Post"}
                    </h3>
                    <p className="text-sm text-gray-700 mt-2">{post.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal - Create Post */}
      {showCreateForm && (
        <CreateCirclePost
          selectedCircle={selectedCircle}
          newPost={newPost}
          setNewPost={setNewPost}
          handleCreatePost={handleCreatePost}
          setShowCreateForm={setShowCreateForm}
        />
      )}
    </div>
  );
};

export default MyCircles;
