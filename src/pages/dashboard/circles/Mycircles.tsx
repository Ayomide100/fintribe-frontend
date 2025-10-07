import React, { useEffect, useState } from "react";
import axios from "@/config/axiosconfig";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import Image from "next/image";
import { EllipsisVertical, Edit, Settings } from "lucide-react";

// import CircleSidebar from "./CircleSidebar";
// import CircleFeed from "./CircleFeed";
import CreateCirclePost from "@/Modals/createcirclepost";
import CircleSidebar from "./circlesidebar";
import CircleFeed from "./circlefeed";
import { getTimeAgo } from "@/utils/utils";

// import { getTimeAgo } from "./utils";

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
  const [myCircles, setMyCircles] = useState<Circle[]>([]);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  console.log(currentUserId);

  const [showCreateForm, setShowCreateForm] = useState(false);

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
      setCurrentUserId(res.data.content.user._id);
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
    getAllMyCircles();
    getUser();
  }, []);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    images: [] as File[],
    isPinned: false,
    isAnnouncement: false,
  });

  const handleCreatePost = async (circleId: string) => {
    if (!newPost.content.trim()) {
      toast.error("Post content is required");
      return;
    }

    const formData = new FormData();
    formData.append("content", newPost.content);
    if (newPost.title) formData.append("title", newPost.title);
    formData.append("isPinned", String(newPost.isPinned));
    formData.append("isAnnouncement", String(newPost.isAnnouncement));

    newPost.images.forEach((img) => formData.append("images", img));

    try {
      toast.loading("Creating post...");
      await axios.post(`/circle/post?circleId=${circleId}`, formData, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.dismiss();
      toast.success("Post created successfully!");
      setNewPost({
        title: "",
        content: "",
        images: [],
        isPinned: false,
        isAnnouncement: false,
      });
      setShowCreateForm(false);
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
                <div className="bg-white px-2 py-2 rounded-md">
                  <EllipsisVertical size={18} />
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="px-6 py-2 flex justify-center text-white items-center gap-2 rounded-md  bg-[#0A2540]"
                  >
                    <Edit size={18} /> Post
                  </button>

                  <div className="bg-white shadow-md px-2 py-1 rounded-md">
                    <Settings size={18} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        <CircleSidebar
          isMobile={isMobile}
          myCircles={myCircles}
          selectedCircle={selectedCircle}
          setSelectedCircle={setSelectedCircle}
        />

        {selectedCircle && (
          <CircleFeed selectedCircle={selectedCircle} getTimeAgo={getTimeAgo} />
        )}
      </div>

      {/* Modal */}
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
