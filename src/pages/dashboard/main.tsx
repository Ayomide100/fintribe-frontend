/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import Dashboardlayouts from "../layouts/Dashboardlayouts";
import Head from "next/head";
import Image from "next/image";

import noface from "../../../assets/blank-profile-picture.webp";

import { BarChart, Camera, MoreHorizontal, Video } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "@/config/axiosconfig";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import Otherside from "./otherside";
import Posts from "@/post";

interface MediaFile {
  url: string;
}

interface User {
  _id: string;
  fullname?: string;
  avatar?: {
    url?: string;
  };
  // Add other user properties as needed
}

interface Post {
  _id: string;
  username: string;
  avatar?: string;
  content: string;
  image?: string;
  media?: MediaFile[];
  createdAt: string;
  user: User;
  role?: string | { name?: string };
  time?: string;
  likes?: any[];
  comments?: any[];
  shares?: number;
  isSaved?: boolean;
  saves?: any[];
}

const Main = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const getUser = async () => {
    try {
      const res = await axios("/users/profile", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });

      const fetchedUser = res.data.content.user;

      // Use avatar if it exists
      if (fetchedUser.avatar) {
        setProfileImage(fetchedUser.avatar.url);
      }
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

      const res = await axios.post("/posts", formData, {
        headers: {
          Authorization: ` ${localStorage.getItem("token")}`,
        },
      });

      setPosts([res.data, ...posts]);
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
  const fetchPosts = async () => {
    try {
      const res = await axios.get("/posts", {
        headers: {
          Authorization: ` ${localStorage.getItem("token")}`,
        },
      });
      console.log("Posts API:", res.data.content);
      const apiPosts = Array.isArray(res.data.content) ? res.data.content : [];

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
  useEffect(() => {
    fetchPosts();
    getUser();
  }, []);

  // const SaveItem = async (postId: string) => {
  //   try {
  //     const res = await axios.post(`/saved/${postId}`, {
  //       headers: { Authorization: `${localStorage.getItem("token")}` },
  //     });
  //     toast.success(res.data.message);
  //     // Optionally update local state to reflect the change

  //     setPosts((prev) =>
  //       prev.map((post) =>
  //         post._id === postId ? { ...post, isSaved: !post.isSaved } : post
  //       )
  //     );
  //   } catch (error) {
  //     if (isAxiosError(error)) {
  //       const apiMessage = error.response?.data?.message;
  //       const apiError = error.response?.data?.error;
  //       const fallback = error.message || "An unexpected error occurred";

  //       const errorMsg =
  //         `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
  //         fallback;

  //       toast.error(errorMsg);
  //     } else {
  //       toast.error("Something went wrong");
  //     }
  //   }
  // };

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
                className="w-full bg-white cursor-pointer rounded-md shadow-md flex justify-start px-5 py-3 gap-2 items-center"
                onClick={() => setIsExpanded(true)}
              >
                <div className="md:w-10 md:h-10  w-[50px] h-[50px] shrink-0  rounded-full flex justify-center items-center">
                  <Image
                    src={profileImage ? profileImage : noface}
                    alt="user"
                    width={40}
                    height={40}
                    className=" object-cover rounded-full "
                  />
                </div>
                <span className="text-sm font-normal text-gray-700">
                  Share an investment insight, market update, or question...
                </span>
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
                <div className="flex justify-between  items-center border-b pb-2 md:hidden">
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
                  <div className="w-[35px] h-[35px] rounded-full flex shrink-0 justify-center items-center">
                    <Image
                      src={profileImage ? profileImage : noface}
                      alt="user"
                      width={40}
                      height={40}
                      className=" object-cover rounded-full "
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
                          x
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
        <div>
          <Posts />
        </div>
        <div className="block md:hidden">
          <Otherside accountType="user" />
        </div>
      </div>
    </Dashboardlayouts>
  );
};

export default Main;
