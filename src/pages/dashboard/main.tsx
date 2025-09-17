/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import Dashboardlayouts from "../layouts/Dashboardlayouts";
import Head from "next/head";
import Image from "next/image";
import userprofilepic from "../../../assets/user.jpg";

import {
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineShareAlt,
} from "react-icons/ai";
import {
  BarChart,
  Bookmark,
  Camera,
  MoreHorizontal,
  ShieldCheck,
  Video,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "@/config/axiosconfig";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

interface MediaFile {
  url: string;
}

interface User {
  fullname?: string;
  avatar?: {
    url?: string;
  };
  // Add other user properties as needed
}

interface Post {
  id: string;
  username: string;
  avatar?: string;
  content: string;
  image?: string;
  media?: MediaFile[];
  createdAt: string;
  user: User;
  role?: string;
  time?: string;
  likes?: any[];
  comments?: any[];
  shares?: number;
}

const Main = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function timeAgoShort(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo`;
    const years = Math.floor(days / 365);
    return `${years}y`;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    const totalFiles = [...media, ...selectedFiles].slice(0, 3);

    setMedia(totalFiles);
  };

  const handlePost = async () => {
    if (!content && media.length === 0) {
      toast.error("Write something or add an image");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("content", content);
      media.forEach((img) => formData.append("media", img));

      const { data } = await axios.post("/posts", formData, {
        headers: {
          Authorization: ` ${localStorage.getItem("token")}`,
        },
      });

      setPosts([data, ...posts]);
      setContent("");
      setMedia([]);
      toast.success("Post created!");
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        const apiError = error.response?.data?.error;
        const fallback = error.message || "An unexpected error occurred";

        const errorMsg =
          `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
          fallback;

        toast.error(errorMsg);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts", {
          headers: {
            Authorization: ` ${localStorage.getItem("token")}`,
          },
        });
        console.log("Posts API:", res.data.content);
        const apiPosts = Array.isArray(res.data.content)
          ? res.data.content
          : [];

        setPosts(apiPosts);
      } catch (error) {
        if (isAxiosError(error)) {
          const apiMessage = error.response?.data?.message;
          const apiError = error.response?.data?.error;
          const fallback = error.message || "An unexpected error occurred";

          const errorMsg =
            `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
            fallback;

          toast.error(errorMsg);
        } else {
          toast.error("Something went wrong");
        }
      }
    };
    fetchPosts();
  }, []);

  function capitalizeWords(name: string) {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return (
    <Dashboardlayouts>
      <Head>
        <title>FinTribe || Dashboard</title>
      </Head>
      <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-hide px-5 py-6 space-y-4">
        {/* Share Box */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              // --- Collapsed input ---
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full bg-white cursor-pointer rounded-md shadow-md flex justify-start px-5 py-3 gap-4 items-center"
                onClick={() => setIsExpanded(true)}
              >
                <div className="w-[35px] h-[35px] rounded-full flex justify-center items-center">
                  <Image
                    src={userprofilepic}
                    alt="user"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <p className="text-sm font-normal text-gray-700">
                  Share an investment insight, market update, or question...
                </p>
              </motion.div>
            ) : (
              // --- Expanded composer ---
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`
          bg-white shadow-md 
          rounded-md p-4 space-y-4 
          w-full
          md:relative
          md:rounded-md 
          ${/* Mobile full-screen overlay */ ""}
          fixed inset-0 z-50 md:z-auto md:inset-auto
          md:space-y-4
        `}
              >
                {/* Mobile Header (only visible on small screens) */}
                <div className="flex justify-between items-center border-b pb-2 md:hidden">
                  <h3 className="text-base font-medium text-gray-800">
                    Create Post
                  </h3>
                  <button
                    onClick={() => {
                      setIsExpanded(false);
                      setContent("");
                    }}
                    className="text-gray-600 hover:content-gray-900"
                  >
                    Cancel
                  </button>
                </div>

                {/* Input */}
                <div className="flex gap-3">
                  <div className="w-[35px] h-[35px] rounded-full flex justify-center items-center">
                    <Image
                      src={userprofilepic}
                      alt="user"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share an investment insight, market update, or question..."
                    className="w-full resize-none focus:outline-none text-sm text-gray-800"
                    rows={4}
                  />
                </div>
                {media.length > 0 && (
                  <div className="flex gap-3 flex-wrap mt-3">
                    {media.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative w-24 h-24 rounded-md overflow-hidden border"
                      >
                        <Image
                          src={URL.createObjectURL(img)}
                          alt="preview"
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setMedia(media.filter((_, i) => i !== idx))
                          }
                          className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Options */}
                <div className="flex justify-between items-center border-t pt-3">
                  <div className="flex gap-4 text-gray-500 text-sm">
                    {/* Photo Upload */}
                    <button
                      type="button"
                      className={`flex items-center gap-1 hover:text-gray-800 ${
                        media.length >= 3 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() =>
                        media.length < 3 && fileInputRef.current?.click()
                      }
                      disabled={media.length >= 3}
                    >
                      <Camera size={18} /> Photo
                    </button>

                    {/* Hidden File Input */}
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleImageChange}
                    />

                    <button className="flex items-center gap-1 hover:text-gray-800">
                      <Video size={18} /> Video
                    </button>
                    <button className="flex items-center gap-1 hover:text-gray-800">
                      <BarChart size={18} /> Poll
                    </button>
                    <button className="flex items-center gap-1 hover:text-gray-800">
                      <MoreHorizontal size={18} /> More
                    </button>
                  </div>

                  {/* Action buttons */}
                  <div className="hidden md:flex gap-3">
                    <button
                      onClick={() => {
                        setIsExpanded(false);
                        setContent("");
                        setMedia([]);
                      }}
                      className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePost}
                      disabled={!content.trim() && media.length === 0}
                      className={`px-4 py-2 rounded-md text-white ${
                        content.trim() || media.length > 0
                          ? "bg-[#0A2540] hover:bg-[#1a3b5c]"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {loading ? "Posting..." : "Post"}
                    </button>
                  </div>
                </div>

                {/* Mobile Post Button */}
                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white p-4 border-t">
                  <button
                    onClick={handlePost}
                    disabled={!content.trim()}
                    className={`w-full py-3 rounded-md text-white content-sm font-medium ${
                      content.trim()
                        ? "bg-[#0A2540] hover:bg-[#1a3b5c]"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {loading ? "Posting..." : "Post"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feed Posts */}
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div
              key={post.id}
              className="w-full bg-white rounded-md shadow-md flex flex-col justify-start px-5 py-4"
            >
              {/* Post Header */}
              <div className="w-full flex justify-start items-center gap-3">
                <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center">
                  <Image
                    src={post.user?.avatar?.url || "/default-avatar.png"}
                    alt="profile"
                    width={200}
                    height={300}
                    className="w-full h-full object-cover rounded-full border-2 border-[#226B44]"
                  />
                </div>
                <div>
                  <h3
                    className="content
                text-sm font-semibold content-gray-800 flex items-center gap-1"
                  >
                    {post.user?.fullname
                      ? capitalizeWords(post.user.fullname)
                      : ""}
                    <span
                      className="text
                  text-[#2E8B57] text-xs"
                    >
                      <ShieldCheck size={15} />
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500">
                    {post.role} · {timeAgoShort(post.createdAt)}
                  </p>
                </div>
              </div>

              {/* content */}
              <p className="mt-3 text-sm text-gray-700">{post.content}</p>

              {/* Post Media */}
              {post.media && post.media.length > 0 && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-md overflow-hidden">
                  {post.media.map((file, idx) => (
                    <Image
                      key={idx}
                      src={file.url}
                      alt={`Post media ${idx + 1}`}
                      width={500}
                      height={300}
                      className="w-full h-auto object-cover rounded-md"
                    />
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="w-full flex justify-between border-t border-[#E0E0E0] items-center content-gray-600 mt-4 px-2">
                <div className="w-[25%] flex py-2.5 justify-between gap-1.5 items-center">
                  <button className="flex items-center gap-1 content-sm hover:content-blue-600">
                    <AiOutlineLike size={18} />{" "}
                    <span>{post.likes?.length || 0}</span>
                  </button>
                  <button className="flex items-center gap-1 content-sm hover:content-blue-600">
                    <AiOutlineComment size={18} />{" "}
                    <span>{post.comments?.length || 0}</span>
                  </button>
                  <button className="flex items-center gap-1 content-sm hover:content-blue-600">
                    <AiOutlineShareAlt size={18} />{" "}
                    <span>{post.shares || 0}</span>
                  </button>
                </div>
                <button className="flex items-center gap-1 content-sm hover:content-blue-600">
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </Dashboardlayouts>
  );
};

export default Main;
