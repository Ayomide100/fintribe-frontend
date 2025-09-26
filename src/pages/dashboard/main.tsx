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
  Trash,
  Video,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "@/config/axiosconfig";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import Otherside from "./otherside";

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
  const [text, setText] = useState("");
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(
    null
  );

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

  const userId = localStorage.getItem("_id");

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
  }, []);

  function capitalizeWords(name: string) {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const handleComment = async (_id: string) => {
    try {
      const res = await axios.post(
        `/posts/${_id}/comments`,
        { text },
        {
          headers: {
            Authorization: ` ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("this is the comment:", res.data);

      setText("");
      fetchPosts();
      setActiveCommentPostId(null);
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

  const HandleLikesonPost = async (_id: string) => {
    try {
      const res = await axios.post(
        `/posts/${_id}/like`,
        {},
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      fetchPosts();
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

  const HandleUnlikePost = async (_PostId: string) => {
    try {
      const res = await axios.delete(`/posts/${_PostId}/like`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      fetchPosts();
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

  const HandleDeleteComment = async (postId: string, commentId: string) => {
    try {
      const res = await axios.delete(`/posts/${postId}/comments/${commentId}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      console.log("Comment deleted:", res.data);
      fetchPosts();
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
                <div className="md:w-[35px] md:h-[35px] w-[50px] h-[50px] rounded-full flex justify-center items-center">
                  <Image
                    src={userprofilepic}
                    alt="user"
                    className="w-[90%] h-[90%] object-cover rounded-full "
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

        {/* Feed Posts */}
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div
              key={post._id}
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
                <div className="mt-3">
                  {/* If 1 image → full width */}
                  {post.media.length === 1 ? (
                    <Image
                      src={post.media[0].url}
                      alt="Post media"
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover rounded-md"
                    />
                  ) : (
                    // If multiple → grid layout
                    <div
                      className={`grid gap-2 rounded-md overflow-hidden ${
                        post.media.length === 2
                          ? "grid-cols-2"
                          : post.media.length === 3
                          ? "grid-cols-2" // 2 on top, 1 bottom
                          : "grid-cols-2" // 4+ = 2x2
                      }`}
                    >
                      {post.media.slice(0, 4).map((file, idx) => (
                        <Image
                          key={idx}
                          src={file.url}
                          alt={`Post media ${idx + 1}`}
                          width={500}
                          height={300}
                          className={`w-full h-auto object-cover ${
                            post.media && post.media.length === 3 && idx === 2
                              ? "col-span-2" // last image spans full width in 3-grid
                              : ""
                          } rounded-md`}
                        />
                      ))}

                      {/* If more than 4 → show overlay on last one */}
                      {post.media.length > 4 && (
                        <div className="relative">
                          <Image
                            src={post.media[4].url}
                            alt="extra media"
                            width={500}
                            height={300}
                            className="w-full h-auto object-cover rounded-md brightness-75"
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                            +{post.media.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="w-full flex justify-between border-t border-[#E0E0E0] items-center text-gray-600 mt-4 px-2">
                <div className="w-[25%] flex py-2.5 justify-between gap-1.5 items-center">
                  <button
                    onClick={() =>
                      post.likes?.some(
                        (like: any) => like === userId || like._id === userId
                      )
                        ? HandleUnlikePost(post._id)
                        : HandleLikesonPost(post._id)
                    }
                    className="flex items-center gap-1 text-sm hover:text-blue-600"
                  >
                    <AiOutlineLike
                      size={18}
                      className={
                        post.likes?.some(
                          (like: any) => like === userId || like._id === userId
                        )
                          ? "text-blue-600"
                          : ""
                      }
                    />
                    <span>{post.likes?.length || 0}</span>
                  </button>

                  <button
                    onClick={() =>
                      setActiveCommentPostId(
                        activeCommentPostId === post._id ? null : post._id
                      )
                    }
                    className="flex items-center gap-1 text-sm hover:text-blue-600"
                  >
                    <AiOutlineComment size={18} />{" "}
                    <span>{post.comments?.length || 0}</span>
                  </button>

                  <button className="flex items-center gap-1 text-sm hover:text-blue-600">
                    <AiOutlineShareAlt size={18} />{" "}
                    <span>{post.shares || 0}</span>
                  </button>
                </div>
                <button className="flex items-center gap-1 text-sm hover:text-blue-600">
                  <Bookmark size={18} />
                </button>
              </div>
              {/* Comments Section */}
              {activeCommentPostId === post._id && (
                <div className="mt-3">
                  {/* Existing comments */}
                  <div className="max-h-64 overflow-y-auto space-y-3 pr-2 mb-4">
                    {post.comments &&
                      post.comments.map((comment) => (
                        <div
                          key={comment._id}
                          className="flex gap-2 items-start"
                        >
                          {/* Avatar */}
                          <Image
                            src={
                              comment.user?.avatar?.url || "/default-avatar.png"
                            }
                            alt="comment user"
                            width={30}
                            height={30}
                            className="w-8 h-8 rounded-full object-cover border"
                          />
                          <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm flex-1">
                            <div className="flex justify-between items-center">
                              <p className="font-semibold">
                                {comment.user?.fullname
                                  ? capitalizeWords(comment.user.fullname)
                                  : "Unknown"}
                              </p>
                              {comment.user?._id === userId && (
                                <button
                                  onClick={() =>
                                    HandleDeleteComment(post._id, comment._id)
                                  }
                                  className="text-red-500 text-xs hover:underline"
                                >
                                  <Trash size={18} />
                                </button>
                              )}
                            </div>
                            <p className="text-gray-700">{comment.text}</p>
                            <span className="text-xs text-gray-500">
                              {timeAgoShort(comment.createdAt)}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* New comment input */}
                  <div className="flex gap-2 items-center pt-2 border-t border-gray-200">
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 border border-[#84C2A2] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A2540]"
                    />
                    <button
                      onClick={() => handleComment(post._id)}
                      className="px-3 py-2 bg-[#0A2540] text-white rounded-md text-sm hover:bg-[#1a3b5c]"
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        <div className="block md:hidden">
          <Otherside accountType="user" />
        </div>
      </div>
    </Dashboardlayouts>
  );
};

export default Main;
